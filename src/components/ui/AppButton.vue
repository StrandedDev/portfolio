<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  variant: { type: String, default: 'primary' },
  href: { type: String, default: '' },
  icon: { type: String, default: '' },
  type: { type: String, default: 'button' },
  target: { type: String, default: '' },
  tabindex: { type: [String, Number], default: undefined },
})

defineEmits(['click'])
</script>

<template>
  <a
    v-if="href"
    class="app-button"
    :class="`app-button--${variant}`"
    :href="href"
    :target="target || undefined"
    :tabindex="tabindex"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    @click="$emit('click', $event)"
  >
    <AppIcon v-if="icon" :name="icon" :size="15" />
    <span><slot /></span>
  </a>
  <button
    v-else
    class="app-button"
    :class="`app-button--${variant}`"
    :type="type"
    :tabindex="tabindex"
    @click="$emit('click', $event)"
  >
    <AppIcon v-if="icon" :name="icon" :size="15" />
    <span><slot /></span>
  </button>
</template>

<style scoped>
.app-button {
  display: inline-flex;
  gap: var(--space-2);
  align-items: center;
  justify-content: center;
  min-height: 38px;
  padding: 0 var(--space-4);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out),
    box-shadow var(--duration-fast) var(--ease-out);
}

.app-button:hover {
  text-decoration: none;
  transform: translateY(-1px);
}

.app-button:active {
  transform: translateY(0) scale(0.98);
}

.app-button--primary {
  background: var(--color-accent-solid);
  color: var(--color-accent-fg);
  box-shadow: 0 6px 16px rgba(55, 148, 255, 0.24);
}

.app-button--primary:hover {
  background: var(--color-accent-solid-strong);
  color: var(--color-accent-fg);
}

.app-button--secondary {
  background: transparent;
  border-color: var(--color-border-strong);
  color: var(--color-fg);
}

.app-button--secondary:hover {
  background: var(--color-hover);
  border-color: var(--color-accent);
  color: var(--color-fg);
}

.app-button--ghost {
  background: transparent;
  color: var(--color-fg-muted);
}

.app-button--ghost:hover {
  background: var(--color-hover);
  color: var(--color-fg);
}

@media (pointer: coarse) {
  .app-button {
    min-height: 44px;
  }
}
</style>
