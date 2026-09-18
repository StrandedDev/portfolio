<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps({
  title: { type: String, default: 'portfolio' },
})

defineEmits(['open-palette'])

const shortcut = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent)
  ? '\u2318 K'
  : 'Ctrl K'
</script>

<template>
  <header class="title-bar">
    <div class="title-bar__left">
      <span class="title-bar__mark" aria-hidden="true"></span>
      <button
        type="button"
        class="title-bar__command"
        @click="$emit('open-palette')"
      >
        <AppIcon name="terminal" :size="12" />
        <span class="title-bar__command-label">Command palette</span>
        <kbd class="title-bar__command-key">{{ shortcut }}</kbd>
      </button>
    </div>
    <p class="title-bar__title">{{ title }}</p>
    <div class="title-bar__controls" aria-hidden="true">
      <span class="title-bar__control"></span>
      <span class="title-bar__control"></span>
      <span class="title-bar__control title-bar__control--close"></span>
    </div>
  </header>
</template>

<style scoped>
.title-bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: var(--titlebar-height);
  padding: 0 var(--space-3);
  background: var(--color-titlebar);
  border-bottom: 1px solid var(--color-border);
  font-size: var(--text-xs);
  user-select: none;
}

.title-bar__left {
  display: flex;
  gap: var(--space-5);
  align-items: center;
  min-width: 0;
}

.title-bar__mark {
  width: 15px;
  height: 15px;
  flex: none;
  background: linear-gradient(135deg, var(--color-accent), var(--syntax-boolean));
  border-radius: var(--radius-sm);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.title-bar__command {
  display: inline-flex;
  gap: var(--space-2);
  align-items: center;
  min-width: 0;
  height: 26px;
  padding: 0 4px;
  color: var(--color-fg-muted);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  transition:
    background-color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.title-bar__command:hover {
  color: var(--color-fg);
  border-color: var(--color-border-strong);
}

.title-bar__command-label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title-bar__command-key {
  flex: none;
  padding: 1px 5px;
  color: var(--color-fg-subtle);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 10px;
  line-height: 1.4;
}

@media (max-width: 720px) {
  .title-bar__command-label {
    display: none;
  }
}

.title-bar__title {
  overflow: hidden;
  color: var(--color-fg);
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title-bar__controls {
  display: flex;
  gap: var(--space-4);
  justify-content: flex-end;
}

.title-bar__control {
  width: 11px;
  height: 11px;
  border: 1px solid var(--color-fg-muted);
  border-radius: 50%;
  transition: background-color var(--duration-fast) var(--ease-out);
}

.title-bar__control--close {
  border-color: #ff5f57;
}

.title-bar__control--close:hover {
  background: #ff5f57;
}
</style>
