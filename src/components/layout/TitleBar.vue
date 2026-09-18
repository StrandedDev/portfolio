<script setup>
defineProps({
  title: { type: String, default: 'portfolio' },
})
</script>

<template>
  <header class="title-bar">
    <div class="title-bar__left">
      <span class="title-bar__mark" aria-hidden="true"></span>
      <span class="title-bar__menu" aria-hidden="true">File</span>
      <span class="title-bar__menu" aria-hidden="true">Edit</span>
      <span class="title-bar__menu" aria-hidden="true">View</span>
    </div>
    <p class="title-bar__title">{{ title }}</p>
    <div class="title-bar__controls" aria-hidden="true">
      <span class="title-bar__control"></span>
      <span class="title-bar__control"></span>
      <span class="title-bar__control title-bar__control--close"></span>
    </div>
  </header>
</template>

<style scoped>
.title-bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: var(--titlebar-height);
  padding: 0 var(--space-2);
  background: var(--color-titlebar);
  border-bottom: 1px solid var(--color-border);
  font-size: var(--text-sm);
  user-select: none;
}

.title-bar__left {
  display: flex;
  gap: var(--space-3);
  align-items: center;
}

.title-bar__mark {
  width: 14px;
  height: 14px;
  background: var(--color-accent);
  border-radius: var(--radius-sm);
}

.title-bar__menu {
  color: var(--color-fg-muted);
}

.title-bar__title {
  color: var(--color-fg);
  text-align: center;
  white-space: nowrap;
}

.title-bar__controls {
  display: flex;
  gap: var(--space-4);
  justify-content: flex-end;
}

.title-bar__control {
  width: 11px;
  height: 11px;
  border: 1px solid var(--color-fg-muted);
  border-radius: 50%;
}
</style>
