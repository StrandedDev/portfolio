<script setup>
defineProps({
  id: { type: String, required: true },
})
</script>

<template>
  <article class="view">
    <h1>Project: {{ id }}</h1>
    <p class="muted">Project detail placeholder.</p>
  </article>
</template>

<style scoped>
.view {
  padding: var(--space-6);
}
</style>
