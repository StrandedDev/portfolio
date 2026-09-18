import { nextTick, onBeforeUnmount, onMounted } from 'vue'
import {
  closePalette,
  openPalette,
  useWorkspace,
} from '@/stores/workspace'

const FOCUS_SILENT = 'focus-silent'

function silenceFocus(el) {
  el.classList.add(FOCUS_SILENT)
  const clear = () => {
    el.classList.remove(FOCUS_SILENT)
    el.removeEventListener('blur', clear)
    el.removeEventListener('keydown', clear)
    el.removeEventListener('pointerdown', clear)
  }
  el.addEventListener('blur', clear, { once: true })
  el.addEventListener('keydown', clear, { once: true })
  el.addEventListener('pointerdown', clear, { once: true })
}

export function useCommandPalette() {
  const workspace = useWorkspace()
  let previousFocus = null

  function open() {
    if (workspace.paletteOpen) return
    previousFocus = document.activeElement
    openPalette()
  }

  function close() {
    if (!workspace.paletteOpen) return
    closePalette()
    const target = previousFocus
    previousFocus = null
    nextTick(() => {
      if (target instanceof HTMLElement && document.contains(target)) {
        silenceFocus(target)
        target.focus({ preventScroll: true })
      }
    })
  }

  function toggle() {
    if (workspace.paletteOpen) close()
    else open()
  }

  function onKeydown(event) {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault()
      toggle()
    }
  }

  onMounted(() => window.addEventListener('keydown', onKeydown))
  onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

  return { workspace, open, close, toggle }
}
