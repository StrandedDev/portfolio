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
    <ul>
      <li v-for="section in sections" :key="section.id">
        <button
          type="button"
          class="activity-bar__item"
          :class="{ 'activity-bar__item--active': active === section.id }"
          :aria-current="active === section.id ? 'page' : undefined"
          :title="section.label"
          @click="$emit('select', section.id)"
        >
          <AppIcon :name="section.icon" :size="22" />
          <span class="visually-hidden">{{ section.label }}</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.activity-bar {
  background: var(--color-activity);
}

.activity-bar ul {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.activity-bar__item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--activitybar-width);
  height: 48px;
  color: var(--color-fg-muted);
  border-left: 2px solid transparent;
}

.activity-bar__item:hover {
  color: var(--color-fg);
}

.activity-bar__item--active {
  color: var(--color-fg);
  border-left-color: var(--color-fg);
}
</style>
