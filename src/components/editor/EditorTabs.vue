<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps({
  tabs: { type: Array, required: true },
  activeId: { type: String, default: '' },
})

defineEmits(['open', 'close'])
</script>

<template>
  <div class="editor-tabs" role="tablist" aria-label="Open files">
    <TransitionGroup name="tab" tag="div" class="editor-tabs__track">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="editor-tab"
        :class="{ 'editor-tab--active': tab.id === activeId }"
      >
        <button
          type="button"
          class="editor-tab__label"
          role="tab"
          :aria-selected="tab.id === activeId"
          @click="$emit('open', tab.id)"
        >
          <i class="codicon editor-tab__icon" :class="`codicon-${tab.icon || 'file'}`" aria-hidden="true"></i>
          <span>{{ tab.label }}</span>
        </button>
        <button
          type="button"
          class="editor-tab__close"
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
.tab-leave-active {
  transition:
    opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.tab-enter-from,
.tab-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
