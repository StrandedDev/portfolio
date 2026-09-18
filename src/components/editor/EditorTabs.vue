<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps({
  tabs: { type: Array, required: true },
  activeId: { type: String, default: '' },
})

defineEmits(['open', 'close'])
</script>

<template>
  <div class="editor-tabs" role="tablist" aria-label="Open files">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      class="editor-tab"
      :class="{ 'editor-tab--active': tab.id === activeId }"
    >
      <button
        type="button"
        class="editor-tab__label"
        role="tab"
        :aria-selected="tab.id === activeId"
        @click="$emit('open', tab.id)"
      >
        <i class="codicon editor-tab__icon" :class="`codicon-${tab.icon || 'file'}`" aria-hidden="true"></i>
        <span>{{ tab.label }}</span>
      </button>
      <button
        type="button"
        class="editor-tab__close"
        :aria-label="`Close ${tab.label}`"
        @click.stop="$emit('close', tab.id)"
      >
        <i class="codicon codicon-close" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.editor-tabs {
  display: flex;
  height: var(--tab-height);
  background: var(--color-sidebar);
  border-bottom: 1px solid var(--color-border);
  overflow-x: auto;
  scrollbar-width: thin;
}

.editor-tab {
  display: flex;
  align-items: center;
  border-right: 1px solid var(--color-border);
  background: var(--color-sidebar);
}

.editor-tab--active {
  background: var(--color-bg);
  border-top: 1px solid var(--color-accent);
}

.editor-tab__label {
  display: inline-flex;
  gap: var(--space-1);
  align-items: center;
  height: 100%;
  padding: 0 var(--space-2) 0 var(--space-3);
  color: var(--color-fg-muted);
  font-size: var(--text-base);
  white-space: nowrap;
}

.editor-tab--active .editor-tab__label {
  color: var(--color-fg);
}

.editor-tab__icon {
  font-size: 14px;
}

.editor-tab__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: var(--space-1);
  color: var(--color-fg-muted);
  border-radius: var(--radius-sm);
}

.editor-tab__close:hover {
  background: var(--color-hover);
  color: var(--color-fg);
}
</style>
