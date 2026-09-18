<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import FileTreeItem from './FileTreeItem.vue'

const props = defineProps({
  nodes: { type: Array, required: true },
  activeId: { type: String, default: '' },
})

const emit = defineEmits(['open'])

const expanded = ref(new Set(['projects']))
const focusedIndex = ref(0)
const itemRefs = new Map()

const visible = computed(() => {
  const out = []
  const walk = (nodes, depth) => {
    for (const node of nodes) {
      out.push({ node, depth })
      if (node.kind === 'folder' && expanded.value.has(node.id) && node.children) {
        walk(node.children, depth + 1)
      }
    }
  }
  walk(props.nodes, 0)
  return out
})

watch(
  () => props.activeId,
  (id) => {
    const index = visible.value.findIndex((entry) => entry.node.id === id)
    if (index !== -1) focusedIndex.value = index
  },
  { immediate: true },
)

function setItemRef(id, el) {
  if (el) itemRefs.set(id, el)
  else itemRefs.delete(id)
}

function focusIndex(index) {
  const clamped = Math.max(0, Math.min(index, visible.value.length - 1))
  focusedIndex.value = clamped
  const entry = visible.value[clamped]
  if (!entry) return
  nextTick(() => {
    const el = itemRefs.get(entry.node.id)
    if (el && el.$el) el.$el.focus()
  })
}

function toggle(id) {
  const next = new Set(expanded.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  expanded.value = next
}

function onOpen(id) {
  const entry = visible.value.find((item) => item.node.id === id)
  if (entry && entry.node.kind === 'folder') toggle(id)
  emit('open', id)
}

function parentIndex(index) {
  const currentDepth = visible.value[index].depth
  for (let i = index - 1; i >= 0; i -= 1) {
    if (visible.value[i].depth < currentDepth) return i
  }
  return -1
}

function onKeydown(event) {
  const entry = visible.value[focusedIndex.value]
  if (!entry) return
  const node = entry.node
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      focusIndex(focusedIndex.value + 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      focusIndex(focusedIndex.value - 1)
      break
    case 'Home':
      event.preventDefault()
      focusIndex(0)
      break
    case 'End':
      event.preventDefault()
      focusIndex(visible.value.length - 1)
      break
    case 'ArrowRight':
      event.preventDefault()
      if (node.kind === 'folder') {
        if (!expanded.value.has(node.id)) toggle(node.id)
        else focusIndex(focusedIndex.value + 1)
      }
      break
    case 'ArrowLeft': {
      event.preventDefault()
      if (node.kind === 'folder' && expanded.value.has(node.id)) {
        toggle(node.id)
      } else {
        const index = parentIndex(focusedIndex.value)
        if (index !== -1) focusIndex(index)
      }
      break
    }
    case 'Enter':
    case ' ':
      event.preventDefault()
      onOpen(node.id)
      break
    default:
      break
  }
}
</script>

<template>
  <div class="file-tree" role="tree" aria-label="Files" @keydown="onKeydown">
    <FileTreeItem
      v-for="(entry, index) in visible"
      :key="entry.node.id"
      :ref="(el) => setItemRef(entry.node.id, el)"
      :node="entry.node"
      :depth="entry.depth"
      :active="entry.node.id === activeId"
      :expanded="expanded.has(entry.node.id)"
      :tabindex="index === focusedIndex ? 0 : -1"
      @open="onOpen"
      @toggle="toggle"
    />
  </div>
</template>

<style scoped>
.file-tree {
  padding: var(--space-1) 0;
}
</style>
