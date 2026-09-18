<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps({
  branch: { type: String, default: 'main' },
  resumePath: { type: String, default: '/resume.pdf' },
})

defineEmits(['open-resume', 'toggle-theme'])
</script>

<template>
  <footer class="status-bar">
    <div class="status-bar__group">
      <button type="button" class="status-bar__item" @click="$emit('open-resume')">
        <AppIcon name="git-branch" :size="14" />
        <span>{{ branch }}</span>
      </button>
    </div>
    <div class="status-bar__group">
      <button type="button" class="status-bar__item" @click="$emit('open-resume')">
        <AppIcon name="cloud-download" :size="14" />
        <span>Resume</span>
      </button>
      <button
        type="button"
        class="status-bar__item"
        aria-label="Toggle color theme"
        @click="$emit('toggle-theme')"
      >
        <AppIcon name="color-mode" :size="14" />
      </button>
    </div>
  </footer>
</template>

<style scoped>
.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--statusbar-height);
  padding: 0 var(--space-2);
  background: var(--color-status);
  color: var(--color-status-fg);
  font-size: var(--text-xs);
}

.status-bar__group {
  display: flex;
  gap: var(--space-1);
}

.status-bar__item {
  display: inline-flex;
  gap: var(--space-1);
  align-items: center;
  height: calc(var(--statusbar-height) - 2px);
  padding: 0 var(--space-2);
  color: inherit;
  border-radius: var(--radius-sm);
  transition: background-color var(--duration-fast) var(--ease-out);
}

.status-bar__item:hover {
  background: rgba(255, 255, 255, 0.18);
}
</style>
