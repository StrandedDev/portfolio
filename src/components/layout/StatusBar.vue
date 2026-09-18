<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps({
  branch: { type: String, default: 'main' },
  resumePath: { type: String, default: '/resume.pdf' },
  file: { type: String, default: 'portfolio' },
})

defineEmits(['open-resume', 'toggle-theme'])
</script>

<template>
  <footer class="status-bar">
    <span class="status-bar__file mono">
      <AppIcon name="file" :size="13" />
      <span translate="no">~/{{ file }}</span>
    </span>
    <div class="status-bar__group status-bar__group--meta">
      <span class="status-bar__item status-bar__item--static">
        <AppIcon name="git-branch" :size="14" />
        <span>{{ branch }}</span>
      </span>
    </div>
    <div class="status-bar__group">
      <button
        type="button"
        class="status-bar__item status-bar__item--resume"
        @click="$emit('open-resume')"
      >
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
  gap: var(--space-2);
  align-items: center;
  justify-content: flex-start;
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

.status-bar__item--static,
.status-bar__item--static:hover {
  background: transparent;
  cursor: default;
}

.status-bar__file {
  display: none;
}

@media (max-width: 767px) {
  .status-bar {
    height: calc(var(--statusbar-height) + env(safe-area-inset-bottom));
    padding-bottom: env(safe-area-inset-bottom);
    justify-content: space-between;
  }

  .status-bar__file {
    display: inline-flex;
    gap: var(--space-2);
    align-items: center;
    min-width: 0;
    padding-left: var(--space-2);
    letter-spacing: 0.01em;
    opacity: 0.92;
  }

  .status-bar__file > span:last-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .status-bar__group--meta,
  .status-bar__item--resume {
    display: none;
  }
}

@media (pointer: coarse) {
  .status-bar {
    height: auto;
    min-height: calc(var(--statusbar-height) + env(safe-area-inset-bottom));
    padding-top: var(--space-1);
    padding-bottom: calc(var(--space-1) + env(safe-area-inset-bottom));
  }

  .status-bar__item {
    height: auto;
    min-height: 44px;
    padding: 0 var(--space-3);
  }
}
</style>
