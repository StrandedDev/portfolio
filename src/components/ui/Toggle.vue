<script setup>
defineProps({
  modelValue: { type: Boolean, default: false },
  labels: { type: Array, default: () => ['Reader', 'JSON'] },
  ariaLabel: { type: String, default: 'View mode' },
})

const emit = defineEmits(['update:modelValue'])

function select(index) {
  emit('update:modelValue', index === 1)
}
</script>

<template>
  <div class="toggle" role="group" :aria-label="ariaLabel">
    <span
      class="toggle__indicator"
      :class="{ 'toggle__indicator--right': modelValue }"
      aria-hidden="true"
    ></span>
    <button
      v-for="(label, index) in labels"
      :key="label"
      type="button"
      class="toggle__option"
      :class="{ 'toggle__option--active': (index === 1) === modelValue }"
      :aria-pressed="(index === 1) === modelValue"
      @click="select(index)"
    >
      {{ label }}
    </button>
  </div>
</template>

<style scoped>
.toggle {
  position: relative;
  display: inline-flex;
  padding: 3px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
}

.toggle__indicator {
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 3px;
  width: calc(50% - 3px);
  background: var(--color-accent);
  border-radius: var(--radius-pill);
  box-shadow: 0 2px 8px rgba(55, 148, 255, 0.3);
  transition: transform var(--duration-base) var(--ease-spring);
}

.toggle__indicator--right {
  transform: translateX(100%);
}

.toggle__option {
  position: relative;
  z-index: 1;
  min-width: 72px;
  padding: var(--space-1) var(--space-3);
  color: var(--color-fg-muted);
  font-size: var(--text-sm);
  font-weight: 500;
  border-radius: var(--radius-pill);
  transition: color var(--duration-fast) var(--ease-out);
}

.toggle__option--active {
  color: var(--color-accent-fg);
}

@media (pointer: coarse) {
  .toggle__option {
    min-height: 44px;
  }
}
</style>
