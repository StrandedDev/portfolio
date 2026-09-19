<script setup>
import { computed, ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const props = defineProps({
  education: { type: Object, required: true },
})

const hasContent = computed(
  () => Boolean(props.education.institution) || Boolean(props.education.degree),
)

const container = ref(null)
useScrollReveal(container)
</script>

<template>
  <article ref="container" class="view view--centered">
    <header class="view__header stagger-enter">
      <h1 class="view__title">Education</h1>
      <span v-if="education.status" class="edu-status">
        <span class="edu-status__dot" aria-hidden="true"></span>
        {{ education.status }}
      </span>
    </header>

    <template v-if="hasContent">
      <section class="edu-card scroll-reveal" aria-labelledby="edu-institution">
        <div class="edu-card__accent" aria-hidden="true"></div>
        <div class="edu-card__content">
          <h2 id="edu-institution" class="edu-card__institution">
            {{ education.institution }}
          </h2>
          <p class="edu-card__degree">{{ education.degree }}</p>
          <dl class="edu-card__meta">
            <div v-if="education.graduation">
              <dt>Graduation</dt>
              <dd>{{ education.graduation }}</dd>
            </div>
            <div v-if="education.location">
              <dt>Location</dt>
              <dd>{{ education.location }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        v-if="education.coursework?.length"
        class="edu-section scroll-reveal"
        aria-labelledby="edu-coursework"
      >
        <h2 id="edu-coursework" class="edu-section__label">Relevant coursework</h2>
        <ul class="edu-tags">
          <li
            v-for="(course, i) in education.coursework"
            :key="course"
            :style="{ animationDelay: `${i * 50}ms` }"
          >
            {{ course }}
          </li>
        </ul>
      </section>

      <section
        v-if="education.achievements?.length"
        class="edu-section scroll-reveal"
        aria-labelledby="edu-achievements"
      >
        <h2 id="edu-achievements" class="edu-section__label">Achievements</h2>
        <ul class="edu-achievements">
          <li
            v-for="item in education.achievements"
            :key="item.label"
            class="edu-achievements__item"
          >
            <AppIcon name="star-full" :size="16" />
            <span class="edu-achievements__body">
              <span class="edu-achievements__label">{{ item.label }}</span>
              <span class="edu-achievements__value">{{ item.value }}</span>
            </span>
          </li>
        </ul>
      </section>
    </template>

    <section v-else class="edu-empty" aria-labelledby="edu-empty-title">
      <AppIcon name="lightbulb" :size="20" />
      <h2 id="edu-empty-title" class="edu-empty__title">
        Education details in progress
      </h2>
      <p class="edu-empty__text">
        University, degree, and coursework are being added. Check back soon.
      </p>
    </section>
  </article>
</template>

<style scoped>
.edu-status {
  display: inline-flex;
  gap: var(--space-2);
  align-items: center;
  padding: var(--space-1) var(--space-3);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  color: var(--color-fg-muted);
  font-size: var(--text-xs);
  letter-spacing: 0.02em;
}

.edu-status__dot {
  width: 6px;
  height: 6px;
  background: var(--syntax-number);
  border-radius: 50%;
  animation: blink 2s ease-in-out infinite;
}

.edu-card {
  display: flex;
  gap: 0;
  overflow: hidden;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition:
    border-color var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

.edu-card:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-glow);
}

.edu-card__accent {
  width: 4px;
  flex: none;
  background: var(--gradient-accent);
}

.edu-card__content {
  flex: 1;
  padding: var(--space-5);
}

.edu-card__institution {
  font-size: var(--text-lg);
  font-weight: 600;
}

.edu-card__degree {
  margin-top: var(--space-1);
  color: var(--color-fg-muted);
  font-size: var(--text-md);
}

.edu-card__meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
  gap: var(--space-4);
  margin-top: var(--space-5);
}

.edu-card__meta dt {
  color: var(--color-fg-subtle);
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.edu-card__meta dd {
  margin: var(--space-1) 0 0;
  font-size: var(--text-sm);
}

.edu-section {
  margin-top: var(--space-6);
}

.edu-section__label {
  margin-bottom: var(--space-3);
  color: var(--color-fg-subtle);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.edu-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.edu-tags li {
  padding: var(--space-1) var(--space-3);
  color: var(--syntax-key);
  background: var(--color-highlight);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  animation: scale-in var(--duration-entrance) var(--ease-entrance) both;
  transition: transform var(--duration-fast) var(--ease-spring);
}

.edu-tags li:hover {
  transform: scale(1.08);
}

.edu-achievements {
  display: grid;
  gap: var(--space-2);
}

.edu-achievements__item {
  display: flex;
  gap: var(--space-3);
  align-items: center;
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition:
    transform var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out);
}

.edu-achievements__item:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow-glow);
}

.edu-achievements__item :deep(.app-icon) {
  color: var(--color-accent);
  flex: none;
}

.edu-achievements__body {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  align-items: baseline;
  justify-content: space-between;
  flex: 1;
}

.edu-achievements__label {
  font-size: var(--text-sm);
  font-weight: 500;
}

.edu-achievements__value {
  color: var(--color-fg-muted);
  font-size: var(--text-sm);
}

.edu-empty {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  align-items: flex-start;
  padding: var(--space-6);
  color: var(--color-fg-muted);
  background: var(--color-bg-elevated);
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--radius-lg);
}

.edu-empty__title {
  color: var(--color-fg);
  font-size: var(--text-md);
  font-weight: 600;
}

.edu-empty__text {
  max-width: 48ch;
  font-size: var(--text-sm);
}
</style>
