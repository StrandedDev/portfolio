<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import AppIcon from '@/components/ui/AppIcon.vue'
import AppButton from '@/components/ui/AppButton.vue'
import { getProjectById } from '@/lib/files'

const props = defineProps({
  id: { type: String, required: true },
})

const project = computed(() => getProjectById(props.id))
</script>

<template>
  <article v-if="project" class="view view--centered stagger-enter">
    <nav class="detail-nav" aria-label="Breadcrumb">
      <RouterLink to="/projects" class="detail-nav__link">
        <AppIcon name="chevron-left" :size="14" />
        Projects
      </RouterLink>
    </nav>

    <header class="detail-header">
      <p class="detail-eyebrow" translate="no">
        <AppIcon name="folder" :size="13" />
        {{ project.id }}.md
      </p>
      <h1 class="view__title">{{ project.name }}</h1>
      <p class="detail-summary">{{ project.summary }}</p>
    </header>

    <p class="detail-description">{{ project.description }}</p>

    <dl class="detail-meta">
      <div>
        <dt>Stack</dt>
        <dd>
          <ul class="detail-stack">
            <li v-for="tech in project.stack" :key="tech" translate="no">{{ tech }}</li>
          </ul>
        </dd>
      </div>
      <div>
        <dt>Role</dt>
        <dd>{{ project.role }}</dd>
      </div>
      <div v-if="project.outcome">
        <dt>Outcome</dt>
        <dd>{{ project.outcome }}</dd>
      </div>
    </dl>

    <div class="detail-actions">
      <AppButton
        v-for="link in project.links"
        :key="link.label"
        :href="link.url"
        :variant="link.label === 'Live' ? 'primary' : 'secondary'"
        icon="link-external"
      >
        {{ link.label }}
      </AppButton>
    </div>
  </article>

  <article v-else class="view view--centered stagger-enter">
    <header class="view__header">
      <h1 class="view__title">Project not found</h1>
    </header>
    <p class="view__lede">
      No case study named <code translate="no">{{ id }}</code>.
    </p>
    <AppButton variant="secondary" icon="arrow-left" @click="$router.push('/projects')">
      Back to projects
    </AppButton>
  </article>
</template>

<style scoped>
.detail-nav {
  margin-bottom: var(--space-5);
  font-size: var(--text-sm);
}

.detail-nav__link {
  display: inline-flex;
  gap: var(--space-1);
  align-items: center;
}

.detail-nav__link :deep(.app-icon) {
  transition: transform var(--duration-base) var(--ease-spring);
}

.detail-nav__link:hover :deep(.app-icon) {
  transform: translateX(-3px);
}

.detail-eyebrow {
  display: inline-flex;
  gap: var(--space-1);
  align-items: center;
  margin-bottom: var(--space-2);
  color: var(--color-fg-subtle);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
}

.detail-summary {
  max-width: 62ch;
  margin-top: var(--space-3);
  color: var(--color-fg-muted);
  font-size: var(--text-md);
}

.detail-description {
  max-width: 68ch;
  margin-top: var(--space-5);
  line-height: var(--line-loose);
}

.detail-meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
  gap: var(--space-4);
  margin-top: var(--space-6);
  padding: var(--space-5);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-accent);
  border-radius: var(--radius-lg);
}

.detail-meta dt {
  color: var(--color-fg-subtle);
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.detail-meta dd {
  margin: var(--space-2) 0 0;
  font-size: var(--text-sm);
}

.detail-stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.detail-stack li {
  padding: var(--space-1) var(--space-2);
  color: var(--syntax-key);
  background: var(--color-highlight);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
}

.detail-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-6);
}
</style>
