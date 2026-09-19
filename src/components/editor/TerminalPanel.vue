<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps({
  open: { type: Boolean, default: false },
  lines: { type: Array, default: () => [] },
})

defineEmits(['close'])
</script>

<template>
  <Transition name="terminal">
    <section v-if="open" class="terminal-panel" aria-label="Terminal">
      <header class="terminal-panel__header">
        <span class="terminal-panel__title mono">
          <AppIcon name="terminal" :size="13" />
          <span>Terminal</span>
        </span>
        <span class="terminal-panel__badge">read-only</span>
        <button
          type="button"
          class="terminal-panel__close"
          aria-label="Close terminal"
          @click="$emit('close')"
        >
          <AppIcon name="close" :size="14" />
        </button>
      </header>
      <pre
        class="terminal-panel__output mono"
        tabindex="0"
        aria-label="Terminal output, read-only"
      ><code translate="no"><span
          v-for="(line, index) in lines"
          :key="index"
          class="terminal-panel__line"
          :class="{ 'terminal-panel__line--command': line.startsWith('$ ') }"
        >{{ line }}</span></code></pre>
    </section>
  </Transition>
</template>

<style scoped>
.terminal-panel {
  display: flex;
  flex-direction: column;
  flex: none;
  height: var(--terminal-height);
  min-height: 0;
  background: var(--color-bg-elevated);
  border-top: 1px solid var(--color-border);
}

.terminal-panel__header {
  display: flex;
  gap: var(--space-2);
  align-items: center;
  height: 30px;
  padding: 0 var(--space-2) 0 var(--space-3);
  border-bottom: 1px solid var(--color-border);
}

.terminal-panel__title {
  display: inline-flex;
  gap: var(--space-2);
  align-items: center;
  color: var(--color-fg);
  font-size: var(--text-xs);
  font-weight: 500;
  letter-spacing: 0.02em;
}

.terminal-panel__badge {
  padding: 1px 6px;
  color: var(--color-fg-muted);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  font-size: 10px;
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.terminal-panel__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  margin-left: auto;
  color: var(--color-fg-muted);
  border-radius: var(--radius-sm);
  transition:
    background-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.terminal-panel__close:hover {
  color: var(--color-fg);
  background: var(--color-hover);
}

.terminal-panel__output {
  flex: 1;
  min-height: 0;
  margin: 0;
  padding: var(--space-3) var(--space-4);
  overflow: auto;
  color: var(--color-fg-muted);
  font-size: var(--text-xs);
  line-height: var(--line-base);
  cursor: default;
  user-select: text;
}

.terminal-panel__line {
  display: block;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.terminal-panel__line--command {
  color: var(--color-accent);
}

.terminal-enter-active {
  transition:
    opacity var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.terminal-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.terminal-leave-active {
  transition: opacity var(--duration-fast) var(--ease-out);
}

.terminal-leave-to {
  opacity: 0;
}

@media (max-width: 767px) {
  .terminal-panel {
    height: 40vh;
    max-height: var(--terminal-height);
  }
}

@media (pointer: coarse) {
  .terminal-panel__close {
    width: 44px;
    height: 44px;
  }
}
</style>
