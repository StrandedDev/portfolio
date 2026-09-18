<script setup>
import FileTree from './FileTree.vue'

defineProps({
  nodes: { type: Array, required: true },
  activeId: { type: String, default: '' },
})

defineEmits(['open'])
</script>

<template>
  <nav class="sidebar" aria-label="Explorer">
    <div class="sidebar__header">
      <h2 class="sidebar__title">Explorer</h2>
      <span class="sidebar__count" aria-hidden="true">
        {{ nodes.length }}
      </span>
    </div>
    <div class="sidebar__scroll">
      <FileTree :nodes="nodes" :active-id="activeId" @open="$emit('open', $event)" />
    </div>
  </nav>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  background: var(--color-sidebar);
  border-right: 1px solid var(--color-border);
}

.sidebar__header {
  display: flex;
  flex: none;
  align-items: center;
  justify-content: space-between;
  height: var(--tab-height);
  padding: 0 var(--space-3);
  border-bottom: 1px solid var(--color-border);
}

.sidebar__title {
  color: var(--color-fg-muted);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.sidebar__count {
  color: var(--color-fg-subtle);
  font-size: var(--text-xs);
}

.sidebar__scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}
</style>
