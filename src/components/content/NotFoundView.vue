<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <article class="view">
    <h1>File not found</h1>
    <p class="muted">
      No file at <code>{{ route.path }}</code>.
    </p>
  </article>
</template>

<style scoped>
.view {
  padding: var(--space-6);
}
</style>
