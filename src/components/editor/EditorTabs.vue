<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const props = defineProps({
  tabs: { type: Array, required: true },
  activeId: { type: String, default: '' },
})

const emit = defineEmits(['open', 'close'])

const buttonRefs = new Map()
const focusedId = ref('')

const rovingId = computed(() => {
  if (focusedId.value && props.tabs.some((tab) => tab.id === focusedId.value)) {
    return focusedId.value
  }
  if (props.activeId && props.tabs.some((tab) => tab.id === props.activeId)) {
    return props.activeId
  }
  return props.tabs[0]?.id ?? ''
})

function setButtonRef(id, el) {
  if (el) buttonRefs.set(id, el)
  else buttonRefs.delete(id)
}

function scrollTabIntoView(id) {
  buttonRefs.get(id)?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
}

function focusTab(id) {
  focusedId.value = id
  nextTick(() => {
    buttonRefs.get(id)?.focus()
    scrollTabIntoView(id)
  })
}

function onTabFocus(id) {
  focusedId.value = id
}

function onKeydown(event) {
  const index = props.tabs.findIndex((tab) => tab.id === rovingId.value)
  if (index === -1) return
  switch (event.key) {
    case 'ArrowRight':
      event.preventDefault()
      focusTab(props.tabs[Math.min(index + 1, props.tabs.length - 1)].id)
      break
    case 'ArrowLeft':
      event.preventDefault()
      focusTab(props.tabs[Math.max(index - 1, 0)].id)
      break
    case 'Home':
      event.preventDefault()
      focusTab(props.tabs[0].id)
      break
    case 'End':
      event.preventDefault()
      focusTab(props.tabs[props.tabs.length - 1].id)
      break
    case 'Delete':
      event.preventDefault()
      emit('close', props.tabs[index].id)
      break
    default:
      break
  }
}

watch(
  () => props.activeId,
  (id) => {
    if (!id) return
    nextTick(() => scrollTabIntoView(id))
  },
  { immediate: true },
)

watch(
  () => props.tabs,
  (tabs) => {
    if (!tabs.some((tab) => tab.id === focusedId.value)) focusedId.value = ''
  },
)
</script>

<template>
  <div class="editor-tabs" role="tablist" aria-label="Open files" @keydown="onKeydown">
    <TransitionGroup name="tab" tag="div" class="editor-tabs__track">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="editor-tab"
        :class="{ 'editor-tab--active': tab.id === activeId }"
      >
        <button
          type="button"
          :ref="(el) => setButtonRef(tab.id, el)"
          class="editor-tab__label"
          role="tab"
          :tabindex="tab.id === rovingId ? 0 : -1"
          :aria-selected="tab.id === activeId"
          @click="$emit('open', tab.id)"
          @focus="onTabFocus(tab.id)"
        >
          <i class="codicon editor-tab__icon" :class="`codicon-${tab.icon || 'file'}`" aria-hidden="true"></i>
          <span translate="no">{{ tab.label }}</span>
        </button>
        <button
          type="button"
          class="editor-tab__close"
          tabindex="-1"
          :aria-label="`Close ${tab.label}`"
          @click.stop="$emit('close', tab.id)"
        >
          <i class="codicon codicon-close" aria-hidden="true"></i>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.editor-tabs {
  display: flex;
  flex: none;
  height: var(--tab-height);
  background: var(--color-sidebar);
  border-bottom: 1px solid var(--color-border);
  overflow-x: auto;
  scrollbar-width: none;
}

.editor-tabs::-webkit-scrollbar {
  height: 0;
}

.editor-tabs__track {
  position: relative;
  display: flex;
  align-items: stretch;
}

.editor-tab {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--color-sidebar);
  border-right: 1px solid var(--color-border);
  transition: background-color var(--duration-fast) var(--ease-out);
}

.editor-tab::after {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 2px;
  background: var(--color-accent);
  opacity: 0;
  transform: scaleX(0.4);
  transition:
    opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-base) var(--ease-spring);
  content: '';
}

.editor-tab--active {
  background: var(--color-bg);
}

.editor-tab--active::after {
  opacity: 1;
  transform: scaleX(1);
}

.editor-tab__label {
  display: inline-flex;
  gap: var(--space-2);
  align-items: center;
  height: 100%;
  padding: 0 var(--space-2) 0 var(--space-3);
  color: var(--color-fg-muted);
  font-size: var(--text-sm);
  white-space: nowrap;
  transition: color var(--duration-fast) var(--ease-out);
}

.editor-tab:hover .editor-tab__label {
  color: var(--color-fg);
}

.editor-tab--active .editor-tab__label {
  color: var(--color-fg);
}

.editor-tab__icon {
  font-size: 14px;
}

.editor-tab__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: var(--space-1);
  color: var(--color-fg-subtle);
  border-radius: var(--radius-sm);
  transition:
    background-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.editor-tab__close:hover {
  background: var(--color-hover);
  color: var(--color-fg);
}

.tab-enter-active,
.tab-leave-active,
.tab-move {
  transition:
    opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.tab-leave-active {
  position: absolute;
  z-index: 0;
}

.tab-enter-from,
.tab-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
