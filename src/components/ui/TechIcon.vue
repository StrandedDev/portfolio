<script setup>
import { Icon } from '@iconify/vue'
import { techLogos } from '@/lib/techLogos'

defineProps({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  custom: { type: Boolean, default: false },
  size: { type: Number, default: 32 },
})
</script>

<template>
  <span class="tech-icon" :style="{ width: `${size}px`, height: `${size}px` }">
    <!-- Colorful Iconify brand logo -->
    <Icon
      v-if="techLogos[icon]"
      :icon="techLogos[icon]"
      :width="size"
      :height="size"
      class="tech-icon__svg"
      aria-hidden="true"
    />

    <!-- Fallback for unknown icons -->
    <span v-else class="tech-icon__fallback mono">
      {{ name.slice(0, 2).toUpperCase() }}
    </span>
  </span>
</template>

<style scoped>
.tech-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  overflow: hidden;
  transition: transform var(--duration-fast) var(--ease-spring);
}

.tech-icon__fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 11px;
  font-weight: 700;
  color: var(--color-accent);
  background: var(--color-highlight);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
}

.tech-icon__svg {
  width: 100%;
  height: 100%;
}
</style>
