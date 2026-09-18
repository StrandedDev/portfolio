<script setup>
import { useRoute, useRouter } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const route = useRoute()
const router = useRouter()
</script>

<template>
  <article class="view">
    <header class="view__header">
      <h1 class="view__title">File not found</h1>
    </header>
    <p class="view__lede">
      No file at <code class="not-found__path" translate="no">{{ route.path }}</code>. It may
      have been moved or deleted.
    </p>
    <AppButton variant="primary" icon="home" @click="router.push('/about')">
      Go to about.json
    </AppButton>

    <p class="not-found__hint">
      <AppIcon name="lightbulb" :size="14" />
      Try <code translate="no">about.json</code>, <code translate="no">projects</code>, or
      <code translate="no">contact.md</code>.
    </p>
  </article>
</template>

<style scoped>
.not-found__path {
  color: var(--syntax-string);
}

.not-found__hint {
  display: inline-flex;
  gap: var(--space-2);
  align-items: center;
  margin-top: var(--space-5);
  color: var(--color-fg-subtle);
  font-size: var(--text-sm);
}
</style>
