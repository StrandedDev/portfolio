import { onScopeDispose, ref } from 'vue'

export function useClipboard(timeout = 1600) {
  const copied = ref(false)
  let timer = null

  async function copy(text) {
    if (!text) return false
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      } else {
        const field = document.createElement('textarea')
        field.value = text
        field.setAttribute('readonly', '')
        field.style.position = 'fixed'
        field.style.opacity = '0'
        document.body.appendChild(field)
        field.select()
        document.execCommand('copy')
        field.remove()
      }
      copied.value = true
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        copied.value = false
      }, timeout)
      return true
    } catch {
      return false
    }
  }

  onScopeDispose(() => {
    if (timer) clearTimeout(timer)
  })

  return { copied, copy }
}
