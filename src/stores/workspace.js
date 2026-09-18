import { reactive } from 'vue'
import { findNodeById } from '@/lib/files'

const state = reactive({
  activeRoute: '/about',
  openTabs: [],
  heroMode: 'reader',
  sidebarOpen: false,
  paletteOpen: false,
})

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
