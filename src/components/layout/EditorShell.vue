<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import profile from '@/data/profile.json'
import {
  breadcrumbsForRoute,
  fileTree,
  findNodeById,
  findNodeByRoute,
} from '@/lib/files'
import { closeTab, toggleSidebar, useWorkspace } from '@/stores/workspace'
import TitleBar from './TitleBar.vue'
import ActivityBar from './ActivityBar.vue'
import StatusBar from './StatusBar.vue'
import Sidebar from '@/components/sidebar/Sidebar.vue'
import EditorTabs from '@/components/editor/EditorTabs.vue'
import Breadcrumbs from '@/components/editor/Breadcrumbs.vue'
import EditorArea from '@/components/editor/EditorArea.vue'

const route = useRoute()
const router = useRouter()
const workspace = useWorkspace()

const theme = ref('dark')

onMounted(() => {
  const stored = localStorage.getItem('portfolio-theme')
  if (stored === 'light' || stored === 'dark') {
    theme.value = stored
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    theme.value = 'light'
  }
})

watchEffect(() => {
  document.documentElement.setAttribute('data-theme', theme.value)
  localStorage.setItem('portfolio-theme', theme.value)
})

const activeNode = computed(() => findNodeByRoute(route.path))
const activeId = computed(() => activeNode.value?.id ?? '')
const tabs = computed(() =>
  workspace.openTabs.map((id) => findNodeById(id)).filter(Boolean),
)
const breadcrumbs = computed(() => breadcrumbsForRoute(route.path))
const title = computed(() =>
  activeNode.value ? `${activeNode.value.label} — portfolio` : 'portfolio',
)

const activeSection = computed(() => {
  if (route.path.startsWith('/projects')) return 'projects'
  return activeNode.value?.id ?? ''
})

function downloadResume() {
  const link = document.createElement('a')
  link.href = profile.resumePath
  link.download = profile.resumePath.split('/').pop() || 'resume.pdf'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

function openNode(id) {
  const node = findNodeById(id)
  if (!node?.route) return
  if (node.id === 'resume') downloadResume()
  router.push(node.route)
}

function onActivitySelect(id) {
  if (id === 'explorer') {
    toggleSidebar()
    return
  }
  openNode(id)
}

function onCloseTab(id) {
  const wasActive = id === activeId.value
  closeTab(id)
  if (!wasActive) return
  const remaining = workspace.openTabs
  const next = remaining.length ? findNodeById(remaining[remaining.length - 1]) : null
  router.push(next?.route ?? '/about')
}

function openResume() {
  downloadResume()
  router.push('/resume')
}

function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="editor-shell">
    <div class="editor-shell__titlebar">
      <TitleBar :title="title" />
    </div>
    <div class="editor-shell__activity">
      <ActivityBar :active="activeSection" @select="onActivitySelect" />
    </div>
    <div class="editor-shell__sidebar">
      <Sidebar :nodes="fileTree" :active-id="activeId" @open="openNode" />
    </div>
    <div class="editor-shell__editor">
      <EditorTabs
        :tabs="tabs"
        :active-id="activeId"
        @open="openNode"
        @close="onCloseTab"
      />
      <Breadcrumbs :path="breadcrumbs" />
      <EditorArea />
    </div>
    <div class="editor-shell__status">
      <StatusBar
        branch="main"
        :resume-path="profile.resumePath"
        @open-resume="openResume"
        @toggle-theme="toggleTheme"
      />
    </div>
  </div>
</template>

<style scoped>
.editor-shell {
  display: grid;
  height: 100%;
  grid-template-areas:
    'title title title'
    'activity sidebar editor'
    'status status status';
  grid-template-rows: var(--titlebar-height) minmax(0, 1fr) var(--statusbar-height);
  grid-template-columns: var(--activitybar-width) var(--sidebar-width) minmax(0, 1fr);
  overflow: hidden;
  background: var(--color-bg);
}

.editor-shell__titlebar {
  grid-area: title;
}

.editor-shell__activity {
  display: flex;
  grid-area: activity;
  min-width: 0;
  min-height: 0;
}

.editor-shell__sidebar {
  display: flex;
  grid-area: sidebar;
  min-width: 0;
  min-height: 0;
}

.editor-shell__editor {
  display: flex;
  flex-direction: column;
  grid-area: editor;
  min-width: 0;
  min-height: 0;
}

.editor-shell__status {
  grid-area: status;
}

.editor-shell__activity > :deep(*),
.editor-shell__sidebar > :deep(*) {
  flex: 1 1 auto;
  min-height: 0;
}

@media (max-width: 900px) {
  .editor-shell {
    grid-template-columns: var(--activitybar-width) 0 minmax(0, 1fr);
  }

  .editor-shell__sidebar {
    display: none;
  }
}
</style>
