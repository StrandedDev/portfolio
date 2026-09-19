<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'

defineProps({
  active: { type: String, default: '' },
  sidebarOpen: { type: Boolean, default: true },
  terminalOpen: { type: Boolean, default: false },
})

defineEmits(['select'])

const sections = [
  { id: 'explorer', icon: 'files', label: 'Explorer' },
  { id: 'palette', icon: 'search', label: 'Command palette' },
  { id: 'about', icon: 'account', label: 'About' },
  { id: 'projects', icon: 'folder', label: 'Projects' },
  { id: 'education', icon: 'mortar-board', label: 'Education', desktopOnly: true },
  { id: 'resume', icon: 'file-pdf', label: 'Resume', desktopOnly: true },
  { id: 'contact', icon: 'mail', label: 'Contact', desktopOnly: true },
]

const paletteShortcut = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent)
  ? '\u2318K'
  : 'Ctrl+K'

function itemTitle(section) {
  if (section.id === 'explorer') return 'Toggle Explorer'
  if (section.id === 'palette') return `Command palette (${paletteShortcut})`
  return section.label
}
</script>

<template>
  <nav class="activity-bar" aria-label="Sections">
    <ul class="activity-bar__list">
      <li
        v-for="section in sections"
        :key="section.id"
        :class="{ 'activity-bar__desktop-only': section.desktopOnly }"
      >
        <button
          type="button"
          class="activity-bar__item"
          :class="{ 'activity-bar__item--active': active === section.id }"
          :aria-current="active === section.id ? 'page' : undefined"
          :aria-pressed="section.id === 'explorer' ? sidebarOpen : undefined"
          :title="itemTitle(section)"
          @click="$emit('select', section.id)"
        >
          <span class="activity-bar__rail" aria-hidden="true"></span>
          <AppIcon :name="section.icon" :size="22" />
          <span class="activity-bar__label">{{ section.label }}</span>
        </button>
      </li>
      <li class="activity-bar__terminal activity-bar__desktop-only">
        <button
          type="button"
          class="activity-bar__item"
          :class="{ 'activity-bar__item--active': terminalOpen }"
          :aria-pressed="terminalOpen"
          title="Toggle Terminal"
          @click="$emit('select', 'terminal')"
        >
          <span class="activity-bar__rail" aria-hidden="true"></span>
          <AppIcon name="terminal" :size="22" />
          <span class="activity-bar__label">Terminal</span>
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
  flex: 1 1 auto;
  flex-direction: column;
  align-items: stretch;
}

.activity-bar__terminal {
  margin-top: auto;
}

.activity-bar__item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 52px;
  padding: 0;
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

.activity-bar__label {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 767px) {
  .activity-bar {
    flex-direction: row;
    height: auto;
    padding-bottom: env(safe-area-inset-bottom);
    background: var(--color-activity);
    border-right: none;
    border-top: 1px solid var(--color-border);
  }

  .activity-bar__list {
    flex-direction: row;
    flex: 1;
  }

  .activity-bar__list > li {
    display: flex;
    flex: 1;
    min-width: 0;
  }

  .activity-bar__terminal {
    margin-top: 0;
  }

  .activity-bar__list > li.activity-bar__desktop-only {
    display: none;
  }

  .activity-bar__item {
    flex: 1;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
    height: 64px;
  }

  .activity-bar__label {
    position: static;
    width: auto;
    height: auto;
    margin: 0;
    overflow: visible;
    clip: auto;
    color: inherit;
    font-size: var(--text-xs);
    line-height: 1;
  }

  .activity-bar__rail {
    top: auto;
    right: 12px;
    bottom: 0;
    left: 12px;
    width: auto;
    height: 2px;
    transform: scaleX(0.3);
  }

  .activity-bar__item--active .activity-bar__rail {
    transform: scaleX(1);
  }
}
</style>
