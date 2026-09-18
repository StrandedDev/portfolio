<script setup>
defineProps({
  node: { type: Object, required: true },
  depth: { type: Number, default: 0 },
  active: { type: Boolean, default: false },
  expanded: { type: Boolean, default: false },
  tabindex: { type: Number, default: -1 },
})

defineEmits(['open', 'toggle'])
</script>

<template>
  <div
    class="tree-item"
    :class="{ 'tree-item--active': active }"
    :style="{ paddingLeft: `${8 + depth * 12}px` }"
    role="treeitem"
    :aria-level="depth + 1"
    :aria-selected="active"
    :aria-expanded="node.kind === 'folder' ? expanded : undefined"
    :tabindex="tabindex"
    @click="$emit('open', node.id)"
  >
    <button
      v-if="node.kind === 'folder'"
      type="button"
      class="tree-item__twistie"
      :aria-label="expanded ? 'Collapse folder' : 'Expand folder'"
      @click.stop="$emit('toggle', node.id)"
    >
      <i
        class="codicon"
        :class="expanded ? 'codicon-chevron-down' : 'codicon-chevron-right'"
        aria-hidden="true"
      ></i>
    </button>
    <span v-else class="tree-item__twistie"></span>
    <i
      class="codicon tree-item__icon"
      :class="node.kind === 'folder' && expanded ? 'codicon-folder-opened' : `codicon-${node.icon || 'file'}`"
      aria-hidden="true"
    ></i>
    <span class="tree-item__label">{{ node.label }}</span>
  </div>
</template>

<style scoped>
.tree-item {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  height: 22px;
  padding-right: var(--space-2);
  color: var(--color-fg);
  font-size: var(--text-base);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
}

.tree-item:hover {
  background: var(--color-hover);
}

.tree-item--active {
  background: var(--color-highlight);
}

.tree-item__twistie {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: var(--color-fg-muted);
}

.tree-item__icon {
  color: var(--color-fg-muted);
}

.tree-item__label {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
