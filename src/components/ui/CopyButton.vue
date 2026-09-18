<script setup>
import { useClipboard } from '@/composables/useClipboard'
import AppIcon from './AppIcon.vue'

const props = defineProps({
  text: { type: String, required: true },
  label: { type: String, default: 'Copy' },
})

const emit = defineEmits(['copied'])

const { copied, copy } = useClipboard()

async function onClick() {
  const ok = await copy(props.text)
  if (ok) emit('copied', props.text)
}
</script>

<template>
  <button
    type="button"
    class="copy-button"
    :class="{ 'copy-button--done': copied }"
    @click="onClick"
  >
    <AppIcon :name="copied ? 'check' : 'copy'" :size="14" />
    <span aria-live="polite">{{ copied ? 'Copied' : label }}</span>
  </button>
</template>

<style scoped>
.copy-button {
  display: inline-flex;
  gap: var(--space-2);
  align-items: center;
  min-height: 32px;
  padding: 0 var(--space-3);
  color: var(--color-fg-muted);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: 500;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    border-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.copy-button:hover {
  background: var(--color-hover);
  border-color: var(--color-accent);
  color: var(--color-fg);
}

.copy-button--done {
  color: var(--syntax-number);
  border-color: var(--syntax-number);
}

@media (pointer: coarse) {
  .copy-button {
    min-height: 44px;
    padding: 0 var(--space-4);
  }
}
</style>
