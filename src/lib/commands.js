import router from '@/router'
import profile from '@/data/profile.json'
import {
  setHeroMode,
  showNotice,
  toggleSidebarCollapsed,
  useWorkspace,
} from '@/stores/workspace'

const workspace = useWorkspace()

function copyText(text, message) {
  if (!text) return
  const done = () => {
    if (message) showNotice(message)
  }
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => {})
    return
  }
  const field = document.createElement('textarea')
  field.value = text
  field.setAttribute('readonly', '')
  field.style.position = 'fixed'
  field.style.opacity = '0'
  document.body.appendChild(field)
  field.select()
  document.execCommand('copy')
  field.remove()
  done()
}

function downloadResume() {
  const link = document.createElement('a')
  link.href = profile.resumePath
  link.download = profile.resumePath.split('/').pop() || 'resume.pdf'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export const commands = [
  {
    id: 'go.about',
    label: 'Go to About',
    keywords: ['about', 'profile', 'home', 'json'],
    icon: 'json',
    run: () => router.push('/about'),
  },
  {
    id: 'go.projects',
    label: 'Go to Projects',
    keywords: ['projects', 'work', 'portfolio'],
    icon: 'folder',
    run: () => router.push('/projects'),
  },
  {
    id: 'go.education',
    label: 'Go to Education',
    keywords: ['education', 'university', 'degree', 'school'],
    icon: 'markdown',
    run: () => router.push('/education'),
  },
  {
    id: 'go.resume',
    label: 'Go to Resume',
    keywords: ['resume', 'cv'],
    icon: 'file-pdf',
    run: () => router.push('/resume'),
  },
  {
    id: 'go.contact',
    label: 'Go to Contact',
    keywords: ['contact', 'email', 'reach'],
    icon: 'mail',
    run: () => router.push('/contact'),
  },
  {
    id: 'action.download-resume',
    label: 'Download resume',
    keywords: ['download', 'resume', 'pdf', 'cv'],
    icon: 'cloud-download',
    run: downloadResume,
  },
  {
    id: 'action.copy-email',
    label: 'Copy email address',
    keywords: ['copy', 'email', 'contact', 'clipboard'],
    icon: 'copy',
    run: () => copyText(profile.email, 'Email copied to clipboard'),
  },
  {
    id: 'action.toggle-theme',
    label: 'Toggle theme',
    keywords: ['theme', 'dark', 'light', 'color', 'mode'],
    icon: 'symbol-color',
    run: () => {
      const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', current)
      localStorage.setItem('portfolio-theme', current)
    },
  },
  {
    id: 'view.toggle-json',
    label: 'Toggle JSON view',
    keywords: ['json', 'reader', 'toggle', 'view', 'about'],
    icon: 'symbol-method',
    run: () => {
      setHeroMode(workspace.heroMode === 'json' ? 'reader' : 'json')
      if (router.currentRoute.value.path !== '/about') router.push('/about')
    },
  },
  {
    id: 'view.toggle-sidebar',
    label: 'Toggle sidebar',
    keywords: ['sidebar', 'explorer', 'collapse', 'expand', 'panel', 'view'],
    icon: 'files',
    run: () => toggleSidebarCollapsed(),
  },
]

export function getCommand(id) {
  return commands.find((command) => command.id === id) ?? null
}
