<script setup>
import AppIcon from './AppIcon.vue'

defineProps({
  message: { type: String, default: '' },
})
</script>

<template>
  <Transition name="toast">
    <div v-if="message" class="toast" role="status" aria-live="polite">
      <AppIcon name="check" :size="14" />
      <span>{{ message }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  bottom: calc(var(--statusbar-height) + var(--space-6));
  transform: translateX(-50%);
  z-index: 90;
  display: inline-flex;
  gap: var(--space-2);
  align-items: center;
  max-width: calc(100vw - var(--space-8));
  padding: var(--space-2) var(--space-4);
  color: var(--color-fg);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-overlay);
  font-size: var(--text-sm);
}

.toast-enter-active,
.toast-leave-active {
  transition:
    opacity var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 6px);
}
</style>
