<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <article class="view">
    <header class="view__header">
      <h1 class="view__title">File not found</h1>
    </header>
    <p class="view__lede">
      No file at <code>{{ route.path }}</code>.
    </p>
  </article>
</template>
