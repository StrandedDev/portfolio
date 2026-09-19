import { onMounted, onUnmounted } from 'vue'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useScrollReveal(containerRef) {
  let observer = null

  onMounted(() => {
    const el = containerRef.value?.$el ?? containerRef.value
    if (!el || prefersReducedMotion) {
      if (el) {
        el.querySelectorAll('.scroll-reveal').forEach((child) => {
          child.classList.add('is-visible')
        })
      }
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    el.querySelectorAll('.scroll-reveal').forEach((child) => {
      observer.observe(child)
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
