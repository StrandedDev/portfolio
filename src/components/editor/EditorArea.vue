<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="editor-area" id="main" tabindex="-1">
    <RouterView v-slot="{ Component, route }">
      <Transition name="view" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>
</template>

<style scoped>
.editor-area {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  background: var(--color-bg);
  scroll-margin-top: var(--tab-height);
}
</style>
