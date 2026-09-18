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
        <span class="breadcrumbs__item">{{ segment }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumbs {
  height: 22px;
  padding: 0 var(--space-3);
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  font-size: var(--text-sm);
}

.breadcrumbs ol {
  display: flex;
  align-items: center;
  height: 100%;
}

.breadcrumbs li {
  display: flex;
  align-items: center;
}

.breadcrumbs__sep {
  margin: 0 var(--space-1);
  color: var(--color-fg-muted);
}

.breadcrumbs__item {
  color: var(--color-fg-muted);
}
</style>
