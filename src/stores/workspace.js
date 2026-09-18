import { reactive } from 'vue'
import { findNodeById } from '@/lib/files'

const state = reactive({
  activeRoute: '/about',
  openTabs: [],
  heroMode: 'reader',
  sidebarOpen: true,
  paletteOpen: false,
  notice: '',
})

let noticeTimer = null

export function useWorkspace() {
  return state
}

export function setActiveRoute(route) {
  state.activeRoute = route
}

export function openFile(id) {
  if (!findNodeById(id)) return
  if (!state.openTabs.includes(id)) state.openTabs.push(id)
}

export function closeTab(id) {
  const index = state.openTabs.indexOf(id)
  if (index !== -1) state.openTabs.splice(index, 1)
}

export function setHeroMode(mode) {
  state.heroMode = mode
}

export function toggleSidebar() {
  state.sidebarOpen = !state.sidebarOpen
}

export function setSidebarOpen(open) {
  state.sidebarOpen = open
}

export function openPalette() {
  state.paletteOpen = true
}

export function closePalette() {
  state.paletteOpen = false
}

export function showNotice(text, duration = 2400) {
  state.notice = text
  if (noticeTimer) clearTimeout(noticeTimer)
  noticeTimer = setTimeout(() => {
    state.notice = ''
    noticeTimer = null
  }, duration)
}

export function clearNotice() {
  state.notice = ''
  if (noticeTimer) clearTimeout(noticeTimer)
  noticeTimer = null
}
