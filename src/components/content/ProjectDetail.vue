<script setup>
defineProps({
  id: { type: String, required: true },
})
</script>

<template>
  <article class="view">
    <header class="view__header">
      <h1 class="view__title">Project: {{ id }}</h1>
    </header>
    <p class="view__lede">Project detail coming in Phase 3.</p>
  </article>
</template>
