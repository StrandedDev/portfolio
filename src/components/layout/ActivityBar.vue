<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps({
  active: { type: String, default: '' },
})

defineEmits(['select'])

const sections = [
  { id: 'explorer', icon: 'files', label: 'Explorer' },
  { id: 'about', icon: 'account', label: 'About' },
  { id: 'projects', icon: 'folder', label: 'Projects' },
  { id: 'resume', icon: 'file-pdf', label: 'Resume' },
  { id: 'contact', icon: 'mail', label: 'Contact' },
]
</script>

<template>
  <nav class="activity-bar" aria-label="Sections">
    <ul class="activity-bar__list">
      <li v-for="section in sections" :key="section.id">
        <button
          type="button"
          class="activity-bar__item"
          :class="{ 'activity-bar__item--active': active === section.id }"
          :aria-current="active === section.id ? 'page' : undefined"
          :title="section.label"
          @click="$emit('select', section.id)"
        >
          <span class="activity-bar__rail" aria-hidden="true"></span>
          <AppIcon :name="section.icon" :size="22" />
          <span class="visually-hidden">{{ section.label }}</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.activity-bar {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: var(--color-activity);
  border-right: 1px solid var(--color-border);
}

.activity-bar__list {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.activity-bar__item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  color: var(--color-fg-subtle);
  transition:
    color var(--duration-fast) var(--ease-out),
    background-color var(--duration-fast) var(--ease-out);
}

.activity-bar__item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--color-fg);
}

.activity-bar__item--active {
  color: var(--color-fg);
}

.activity-bar__rail {
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 0;
  width: 2px;
  background: var(--color-fg);
  border-radius: var(--radius-pill);
  opacity: 0;
  transform: scaleY(0.3);
  transition:
    opacity var(--duration-fast) var(--ease-out),
    transform var(--duration-base) var(--ease-spring);
}

.activity-bar__item--active .activity-bar__rail {
  opacity: 1;
  transform: scaleY(1);
}
</style>
