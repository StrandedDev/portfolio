<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import { getProjects } from '@/lib/files'
import { useScrollReveal } from '@/composables/useScrollReveal'

const projects = getProjects()
const container = ref(null)

useScrollReveal(container)
</script>

<template>
  <article ref="container" class="view view--centered">
    <header class="view__header stagger-enter">
      <h1 class="view__title">Projects</h1>
      <span class="view__count">{{ projects.length }} case studies</span>
    </header>
    <p class="view__lede stagger-enter">
      Selected work. Each case study covers the problem, the approach, and the
      result.
    </p>

    <ul v-if="projects.length" class="project-list">
      <li
        v-for="(project, index) in projects"
        :key="project.id"
        class="project-card scroll-reveal"
        :style="{ transitionDelay: `${index * 80}ms` }"
      >
        <div class="project-card__top">
          <h2 class="project-card__name">
            <RouterLink :to="`/projects/${project.id}`">
              {{ project.name }}
            </RouterLink>
          </h2>
          <span v-if="project.featured" class="project-card__badge">
            Featured
          </span>
        </div>

        <p class="project-card__summary">{{ project.summary }}</p>

        <ul class="project-card__stack">
          <li v-for="tech in project.stack" :key="tech" translate="no">{{ tech }}</li>
        </ul>

        <dl class="project-card__meta">
          <div>
            <dt>Role</dt>
            <dd>{{ project.role }}</dd>
          </div>
          <div v-if="project.outcome">
            <dt>Outcome</dt>
            <dd>{{ project.outcome }}</dd>
          </div>
        </dl>

        <div class="project-card__footer">
          <div class="project-card__links">
            <a
              v-for="link in project.links"
              :key="link.label"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ link.label }}
              <AppIcon name="link-external" :size="13" />
            </a>
          </div>
          <RouterLink
            class="project-card__more"
            :to="`/projects/${project.id}`"
          >
            Case study
            <AppIcon name="chevron-right" :size="14" />
          </RouterLink>
        </div>
      </li>
    </ul>

    <section v-else class="empty-state" aria-labelledby="projects-empty-title">
      <AppIcon name="lightbulb" :size="20" />
      <h2 id="projects-empty-title" class="empty-state__title">
        Case studies in progress
      </h2>
      <p class="empty-state__text">
        Selected projects and write-ups are being prepared. Check back soon.
      </p>
    </section>
  </article>
</template>

<style scoped>
.view__count {
  color: var(--color-fg-subtle);
  font-size: var(--text-sm);
}

.empty-state {
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

.empty-state__title {
  color: var(--color-fg);
  font-size: var(--text-md);
  font-weight: 600;
}

.empty-state__text {
  max-width: 48ch;
  font-size: var(--text-sm);
}

.project-list {
  display: grid;
  gap: var(--space-4);
}

.project-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-5);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition:
    border-color var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.project-card:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-4px);
}

.project-card__top {
  display: flex;
  gap: var(--space-3);
  align-items: center;
  justify-content: space-between;
}

.project-card__name {
  font-size: var(--text-lg);
  font-weight: 600;
  overflow-wrap: anywhere;
}

.project-card__name a {
  color: var(--color-fg);
}

.project-card__name a:hover {
  color: var(--color-accent);
  text-decoration: none;
}

.project-card__badge {
  flex: none;
  padding: var(--space-1) var(--space-2);
  color: var(--color-accent-strong);
  background: var(--color-highlight);
  border-radius: var(--radius-pill);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background-image: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.08) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 3s linear infinite;
}

.project-card__summary {
  color: var(--color-fg-muted);
  font-size: var(--text-md);
}

.project-card__stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.project-card__stack li {
  padding: var(--space-1) var(--space-2);
  color: var(--syntax-key);
  background: var(--color-highlight);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  transition: transform var(--duration-fast) var(--ease-spring);
}

.project-card__stack li:hover {
  transform: scale(1.08);
}

.project-card__meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
  gap: var(--space-3);
}

.project-card__meta dt {
  color: var(--color-fg-subtle);
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.project-card__meta dd {
  margin: var(--space-1) 0 0;
  font-size: var(--text-sm);
}

.project-card__footer {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-border);
}

.project-card__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  font-size: var(--text-sm);
}

.project-card__links a {
  display: inline-flex;
  gap: var(--space-1);
  align-items: center;
}

.project-card__more {
  display: inline-flex;
  gap: var(--space-1);
  align-items: center;
  font-size: var(--text-sm);
  font-weight: 500;
}

.project-card__more :deep(.app-icon) {
  transition: transform var(--duration-base) var(--ease-spring);
}

.project-card__more:hover :deep(.app-icon) {
  transform: translateX(3px);
}
</style>
