<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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

watchEffect(() => {
  document.documentElement.setAttribute('data-theme', theme.value)
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

function openNode(id) {
  const node = findNodeById(id)
  if (node?.route) router.push(node.route)
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
        resume-path="/resume.pdf"
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
}

.editor-shell__titlebar {
  grid-area: title;
}

.editor-shell__activity {
  grid-area: activity;
  min-height: 0;
}

.editor-shell__sidebar {
  grid-area: sidebar;
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
</style>
