import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useMediaQuery(query) {
  const list =
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia(query)
      : null
  const matches = ref(list ? list.matches : false)

  function onChange(event) {
    matches.value = event.matches
  }

  onMounted(() => {
    if (!list) return
    matches.value = list.matches
    list.addEventListener('change', onChange)
  })

  onBeforeUnmount(() => {
    if (!list) return
    list.removeEventListener('change', onChange)
  })

  return matches
}
