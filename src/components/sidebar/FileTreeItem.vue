<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'

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
    :style="{ paddingLeft: `${8 + depth * 14}px` }"
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
      <AppIcon
        class="tree-item__chevron"
        :name="expanded ? 'chevron-down' : 'chevron-right'"
        :size="16"
      />
    </button>
    <span v-else class="tree-item__twistie"></span>
    <AppIcon
      class="tree-item__icon"
      :name="node.kind === 'folder' && expanded ? 'folder-opened' : node.icon || 'file'"
      :size="15"
    />
    <span class="tree-item__label" translate="no">{{ node.label }}</span>
  </div>
</template>

<style scoped>
.tree-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-1);
  height: 26px;
  padding-right: var(--space-2);
  color: var(--color-fg-muted);
  font-size: var(--text-sm);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition:
    background-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.tree-item:hover {
  background: var(--color-hover);
  color: var(--color-fg);
}

.tree-item--active {
  background: var(--color-active);
  color: var(--color-active-fg);
}

.tree-item--active::before {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 0;
  width: 2px;
  background: var(--color-accent);
  border-radius: var(--radius-pill);
  content: '';
}

.tree-item__twistie {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  color: inherit;
}

.tree-item__chevron {
  transition: transform var(--duration-fast) var(--ease-out);
}

.tree-item__icon {
  flex: none;
}

.tree-item--active .tree-item__icon {
  color: var(--color-accent-strong);
}

.tree-item__label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (pointer: coarse) {
  .tree-item {
    height: 44px;
  }
}
</style>
