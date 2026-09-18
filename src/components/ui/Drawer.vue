<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  side: { type: String, default: 'left' },
  label: { type: String, default: 'Navigation' },
})

const emit = defineEmits(['close'])

const panelEl = ref(null)
let previousFocus = null

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function onKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault()
    emit('close')
    return
  }
  if (event.key !== 'Tab') return
  const panel = panelEl.value
  if (!panel) return
  const focusables = Array.from(panel.querySelectorAll(FOCUSABLE))
  if (!focusables.length) {
    event.preventDefault()
    return
  }
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  const active = document.activeElement
  const inside = panel.contains(active)
  if (event.shiftKey) {
    if (!inside || active === first) {
      event.preventDefault()
      last.focus()
    }
  } else if (!inside || active === last) {
    event.preventDefault()
    first.focus()
  }
}

function lockScroll(lock) {
  if (typeof document === 'undefined') return
  document.body.style.overflow = lock ? 'hidden' : ''
}

watch(
  () => props.open,
  (open) => {
    if (typeof document === 'undefined') return
    if (open) {
      previousFocus = document.activeElement
      document.addEventListener('keydown', onKeydown)
      lockScroll(true)
      requestAnimationFrame(() => panelEl.value?.focus())
    } else {
      document.removeEventListener('keydown', onKeydown)
      lockScroll(false)
      const target = previousFocus
      previousFocus = null
      if (target instanceof HTMLElement && document.contains(target)) {
        target.focus({ preventScroll: true })
      }
    }
  },
)

onBeforeUnmount(() => {
  if (typeof document === 'undefined') return
  document.removeEventListener('keydown', onKeydown)
  lockScroll(false)
})
</script>

<template>
  <Transition name="drawer">
    <div v-if="open" class="drawer" @click.self="$emit('close')">
      <aside
        ref="panelEl"
        class="drawer__panel"
        :class="`drawer__panel--${side}`"
        role="dialog"
        aria-modal="true"
        :aria-label="label"
        tabindex="-1"
      >
        <slot />
      </aside>
    </div>
  </Transition>
</template>

<style scoped>
.drawer {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  background: rgba(0, 0, 0, 0.45);
  overscroll-behavior: contain;
}

.drawer__panel {
  display: flex;
  flex-direction: column;
  width: min(300px, 84vw);
  height: 100%;
  min-height: 0;
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  background: var(--color-sidebar);
  box-shadow: var(--shadow-overlay);
  overscroll-behavior: contain;
}

.drawer__panel--left {
  margin-right: auto;
  border-right: 1px solid var(--color-border-strong);
}

.drawer__panel--right {
  margin-left: auto;
  border-left: 1px solid var(--color-border-strong);
}

.drawer__panel > :deep(*) {
  flex: 1 1 auto;
  min-height: 0;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity var(--duration-base) var(--ease-out);
}

.drawer-enter-active .drawer__panel,
.drawer-leave-active .drawer__panel {
  transition: transform var(--duration-base) var(--ease-out);
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from .drawer__panel--left,
.drawer-leave-to .drawer__panel--left {
  transform: translateX(-100%);
}

.drawer-enter-from .drawer__panel--right,
.drawer-leave-to .drawer__panel--right {
  transform: translateX(100%);
}
</style>
