<script setup>
import { RouterLink } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import { getProjects } from '@/lib/files'

const projects = getProjects()
</script>

<template>
  <article class="view">
    <header class="view__header">
      <h1 class="view__title">Projects</h1>
      <span class="view__count">{{ projects.length }} case studies</span>
    </header>
    <p class="view__lede">
      Selected work. Each case study covers the problem, the approach, and the
      result.
    </p>

    <ul class="project-list">
      <li v-for="project in projects" :key="project.id" class="project-card">
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
  </article>
</template>

<style scoped>
.view__count {
  color: var(--color-fg-subtle);
  font-size: var(--text-sm);
}

.project-list {
  display: grid;
  gap: var(--space-4);
}

.project-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-5);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition:
    border-color var(--duration-base) var(--ease-out),
    transform var(--duration-base) var(--ease-out);
}

.project-card:hover {
  border-color: var(--color-border-strong);
  transform: translateY(-2px);
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
}

.project-card__meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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
</style>
