<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  commands: { type: Array, default: () => [] },
})

const emit = defineEmits(['close', 'run'])

const query = ref('')
const activeIndex = ref(0)
const inputEl = ref(null)

const filtered = computed(() => {
  const needle = query.value.trim().toLowerCase()
  if (!needle) return props.commands
  return props.commands.filter((command) => {
    const haystack = [command.label, ...(command.keywords ?? [])]
      .join(' ')
      .toLowerCase()
    return haystack.includes(needle)
  })
})

const activeDescendant = computed(() => {
  const command = filtered.value[activeIndex.value]
  return command ? `palette-option-${command.id}` : undefined
})

watch(
  () => props.open,
  async (isOpen) => {
    if (!isOpen) return
    query.value = ''
    activeIndex.value = 0
    await nextTick()
    inputEl.value?.focus()
  },
)

watch(filtered, (list) => {
  if (activeIndex.value >= list.length) activeIndex.value = 0
})

function move(delta) {
  const count = filtered.value.length
  if (!count) return
  activeIndex.value = (activeIndex.value + delta + count) % count
}

function choose(index) {
  activeIndex.value = index
  const command = filtered.value[index]
  if (command) emit('run', command.id)
}

function onKeydown(event) {
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    move(1)
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    move(-1)
  } else if (event.key === 'Enter') {
    event.preventDefault()
    const command = filtered.value[activeIndex.value]
    if (command) emit('run', command.id)
  } else if (event.key === 'Escape') {
    event.preventDefault()
    emit('close')
  } else if (event.key === 'Tab') {
    event.preventDefault()
  }
}
</script>

<template>
  <Transition name="palette">
    <div v-if="open" class="palette" @click.self="$emit('close')">
      <div
        class="palette__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        @keydown="onKeydown"
      >
        <div class="palette__search">
          <AppIcon name="search" :size="16" />
          <input
            ref="inputEl"
            v-model="query"
            class="palette__input"
            type="text"
            placeholder="Type a command…"
            autocomplete="off"
            autocapitalize="off"
            spellcheck="false"
            role="combobox"
            aria-label="Search commands"
            :aria-expanded="filtered.length > 0"
            aria-controls="palette-list"
            aria-autocomplete="list"
            :aria-activedescendant="activeDescendant"
          />
        </div>
        <ul id="palette-list" class="palette__list" role="listbox" aria-label="Commands">
          <li
            v-for="(command, index) in filtered"
            :id="`palette-option-${command.id}`"
            :key="command.id"
            class="palette__option"
            :class="{ 'palette__option--active': index === activeIndex }"
            role="option"
            :aria-selected="index === activeIndex"
            @mousemove="activeIndex = index"
            @mousedown.prevent
            @click="choose(index)"
          >
            <AppIcon :name="command.icon || 'symbol-method'" :size="14" />
            <span class="palette__label">{{ command.label }}</span>
          </li>
          <li v-if="!filtered.length" class="palette__empty" role="presentation">
            No matching commands
          </li>
        </ul>
        <div class="palette__footer" aria-hidden="true">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>Enter</kbd> run</span>
          <span><kbd>Esc</kbd> close</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.palette {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 12vh var(--space-4) var(--space-4);
  padding: max(12vh, env(safe-area-inset-top))
    max(var(--space-4), env(safe-area-inset-right))
    max(var(--space-4), env(safe-area-inset-bottom))
    max(var(--space-4), env(safe-area-inset-left));
  background: rgba(0, 0, 0, 0.45);
  overscroll-behavior: contain;
}

.palette__panel {
  display: flex;
  flex-direction: column;
  width: min(560px, 100%);
  max-height: 60vh;
  max-height: 60dvh;
  overflow: hidden;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-overlay);
}

.palette__search {
  display: flex;
  gap: var(--space-2);
  align-items: center;
  padding: 0 var(--space-4);
  color: var(--color-fg-muted);
  border-bottom: 1px solid var(--color-border);
  transition: border-color var(--duration-fast) var(--ease-out);
}

.palette__search:focus-within {
  border-bottom-color: var(--color-accent);
}

.palette__input {
  flex: 1;
  min-height: 46px;
  padding: 0;
  color: var(--color-fg);
  background: transparent;
  border: none;
  font-family: var(--font-ui);
  font-size: var(--text-md);
  outline: none;
}

.palette__input:focus-visible {
  outline: none;
  box-shadow: none;
}

.palette__input::placeholder {
  color: var(--color-fg-subtle);
}

.palette__list {
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: var(--space-2);
}

.palette__option {
  display: flex;
  gap: var(--space-3);
  align-items: center;
  min-height: 38px;
  padding: 0 var(--space-3);
  color: var(--color-fg-muted);
  border-radius: var(--radius-md);
  cursor: pointer;
}

.palette__option--active {
  color: var(--color-active-fg);
  background: var(--color-active);
}

.palette__empty {
  padding: var(--space-4) var(--space-3);
  color: var(--color-fg-subtle);
  font-size: var(--text-sm);
}

.palette__footer {
  display: flex;
  flex: none;
  gap: var(--space-4);
  padding: var(--space-2) var(--space-4);
  color: var(--color-fg-subtle);
  border-top: 1px solid var(--color-border);
  font-size: var(--text-xs);
}

.palette__footer span {
  display: inline-flex;
  gap: var(--space-1);
  align-items: center;
}

.palette__footer kbd {
  padding: 1px 5px;
  color: var(--color-fg-muted);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 10px;
  line-height: 1.4;
}

.palette-enter-active,
.palette-leave-active {
  transition: opacity var(--duration-base) var(--ease-out);
}

.palette-enter-active .palette__panel,
.palette-leave-active .palette__panel {
  transition: transform var(--duration-base) var(--ease-out);
}

.palette-enter-from,
.palette-leave-to {
  opacity: 0;
}

.palette-enter-from .palette__panel,
.palette-leave-to .palette__panel {
  transform: translateY(-8px);
}

@media (max-width: 767px) {
  .palette {
    padding-top: max(8vh, env(safe-area-inset-top));
  }

  .palette__panel {
    max-height: 72vh;
    max-height: 72dvh;
  }
}

@media (pointer: coarse) {
  .palette__option {
    min-height: 46px;
  }

  .palette__input {
    min-height: 52px;
  }
}
</style>
