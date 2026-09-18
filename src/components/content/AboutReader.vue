<script setup>
import AppButton from '@/components/ui/AppButton.vue'

defineProps({
  profile: { type: Object, required: true },
  interactive: { type: Boolean, default: true },
})

defineEmits(['open-resume', 'open-contact'])
</script>

<template>
  <section class="hero">
    <p class="hero__eyebrow">
      <span class="hero__pulse" aria-hidden="true"></span>
      {{ profile.role }}
    </p>
    <h1 class="hero__name">{{ profile.name }}</h1>
    <p class="hero__location">{{ profile.location }}</p>
    <p class="hero__summary">{{ profile.summary }}</p>

    <div class="hero__actions">
      <AppButton
        variant="primary"
        icon="cloud-download"
        :tabindex="interactive ? undefined : -1"
        @click="$emit('open-resume')"
      >
        Resume
      </AppButton>
      <AppButton
        variant="secondary"
        icon="mail"
        :tabindex="interactive ? undefined : -1"
        @click="$emit('open-contact')"
      >
        Contact
      </AppButton>
    </div>

    <dl class="hero__facts">
      <div v-for="fact in profile.facts" :key="fact.label" class="hero__fact">
        <dt>{{ fact.label }}</dt>
        <dd>{{ fact.value }}</dd>
      </div>
    </dl>

    <ul class="hero__links">
      <li v-for="link in profile.links" :key="link.label">
        <a
          :href="link.url"
          :tabindex="interactive ? undefined : -1"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ link.label }}
        </a>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.hero {
  animation: fade-up var(--duration-slow) var(--ease-out) both;
}

.hero__eyebrow {
  display: inline-flex;
  gap: var(--space-2);
  align-items: center;
  padding: var(--space-1) var(--space-3);
  margin-bottom: var(--space-5);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  color: var(--color-fg-muted);
  font-size: var(--text-sm);
  letter-spacing: 0.02em;
}

.hero__pulse {
  position: relative;
  width: 7px;
  height: 7px;
  background: var(--syntax-number);
  border-radius: 50%;
}

.hero__pulse::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--syntax-number);
  border-radius: 50%;
  opacity: 0.55;
  animation: pulse 2.4s var(--ease-out) infinite;
}

.hero__name {
  font-size: var(--text-2xl);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.hero__location {
  margin-top: var(--space-1);
  color: var(--color-fg-muted);
  font-size: var(--text-base);
}

.hero__summary {
  max-width: 62ch;
  margin-top: var(--space-5);
  font-size: var(--text-md);
  line-height: var(--line-loose);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.hero__facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--space-3);
  margin-top: var(--space-7);
}

.hero__fact {
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition:
    border-color var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.hero__fact:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.hero__fact dt {
  color: var(--color-fg-muted);
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero__fact dd {
  margin: var(--space-1) 0 0;
  font-size: var(--text-base);
  font-weight: 500;
}

.hero__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-top: var(--space-6);
  font-size: var(--text-sm);
}

.hero__links a {
  display: inline-flex;
  gap: var(--space-1);
  align-items: center;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.55;
  }
  70% {
    transform: scale(3.3);
    opacity: 0;
  }
  100% {
    transform: scale(3.3);
    opacity: 0;
  }
}

@media (max-width: 767px) {
  .hero__name {
    font-size: 36px;
  }

  .hero__facts {
    grid-template-columns: 1fr;
    gap: 0;
    margin-top: var(--space-6);
    overflow: hidden;
    background: var(--color-bg-elevated);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
  }

  .hero__fact {
    display: flex;
    gap: var(--space-4);
    align-items: baseline;
    justify-content: space-between;
    padding: var(--space-3) var(--space-4);
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--color-border);
    border-radius: 0;
    transform: none;
  }

  .hero__fact:last-child {
    border-bottom: none;
  }

  .hero__fact:hover {
    border-color: transparent;
    transform: none;
  }

  .hero__fact dd {
    margin: 0;
    text-align: right;
  }
}
</style>
