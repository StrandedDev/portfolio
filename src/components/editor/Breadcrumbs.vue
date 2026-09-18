<script setup>
defineProps({
  path: { type: Array, required: true },
})
</script>

<template>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol>
      <li v-for="(segment, index) in path" :key="`${segment}-${index}`">
        <span v-if="index > 0" class="breadcrumbs__sep" aria-hidden="true">
          <i class="codicon codicon-chevron-right"></i>
        </span>
        <span
          class="breadcrumbs__item"
          translate="no"
          :aria-current="index === path.length - 1 ? 'page' : undefined"
        >{{ segment }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumbs {
  flex: none;
  height: 26px;
  padding: 0 var(--space-3);
  overflow: hidden;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  font-size: var(--text-xs);
}

.breadcrumbs ol {
  display: flex;
  align-items: center;
  height: 100%;
  white-space: nowrap;
}

.breadcrumbs li {
  display: flex;
  align-items: center;
}

.breadcrumbs__sep {
  margin: 0 var(--space-1);
  color: var(--color-fg-subtle);
}

.breadcrumbs__item {
  color: var(--color-fg-muted);
  transition: color var(--duration-fast) var(--ease-out);
}

.breadcrumbs li:last-child .breadcrumbs__item {
  color: var(--color-fg);
}
</style>
