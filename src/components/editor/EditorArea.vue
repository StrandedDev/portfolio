<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="editor-area" id="main">
    <RouterView />
  </main>
</template>

<style scoped>
.editor-area {
  min-height: 0;
  overflow-y: auto;
  background: var(--color-bg);
}
</style>
