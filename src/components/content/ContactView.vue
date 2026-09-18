<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'
import CopyButton from '@/components/ui/CopyButton.vue'
import profile from '@/data/profile.json'

defineEmits(['copy'])
</script>

<template>
  <article class="view">
    <header class="view__header">
      <h1 class="view__title">Contact</h1>
    </header>
    <p class="view__lede">
      The fastest way to reach me is email. I usually reply within a day.
    </p>

    <section class="contact-card" aria-labelledby="contact-email">
      <h2 id="contact-email" class="contact-card__label">Email</h2>
      <div class="contact-card__row">
        <a
          class="contact-card__email mono"
          :href="`mailto:${profile.email}`"
          translate="no"
        >
          <AppIcon name="mail" :size="16" />
          {{ profile.email }}
        </a>
        <CopyButton
          :text="profile.email"
          label="Copy email"
          @copied="$emit('copy', $event)"
        />
      </div>
    </section>

    <section class="contact-links" aria-labelledby="contact-links">
      <h2 id="contact-links" class="contact-card__label">Elsewhere</h2>
      <ul class="contact-links__list">
        <li v-for="link in profile.links" :key="link.label">
          <a :href="link.url" target="_blank" rel="noopener noreferrer">
            <AppIcon name="link-external" :size="14" />
            <span>{{ link.label }}</span>
          </a>
        </li>
      </ul>
    </section>
  </article>
</template>

<style scoped>
.contact-card {
  padding: var(--space-5);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.contact-card__label {
  margin-bottom: var(--space-3);
  color: var(--color-fg-subtle);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.contact-card__row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  align-items: center;
  justify-content: space-between;
}

.contact-card__email {
  display: inline-flex;
  gap: var(--space-2);
  align-items: center;
  font-size: var(--text-md);
}

.contact-links {
  margin-top: var(--space-6);
}

.contact-links__list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.contact-links__list a {
  display: inline-flex;
  gap: var(--space-2);
  align-items: center;
  min-height: 38px;
  padding: 0 var(--space-4);
  color: var(--color-fg);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  transition:
    border-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out);
}

.contact-links__list a:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  text-decoration: none;
}
</style>
