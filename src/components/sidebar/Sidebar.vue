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
    <h2 class="sidebar__title">Explorer</h2>
    <div class="sidebar__scroll">
      <FileTree :nodes="nodes" :active-id="activeId" @open="$emit('open', $event)" />
    </div>
  </nav>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  min-height: 0;
  background: var(--color-sidebar);
  border-right: 1px solid var(--color-border);
}

.sidebar__title {
  flex: none;
  padding: var(--space-2) var(--space-3);
  color: var(--color-fg-muted);
  font-size: var(--text-sm);
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.sidebar__scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}
</style>
