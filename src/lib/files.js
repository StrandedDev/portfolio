import projects from '@/data/projects.json'
import devProjects from '@/data/projects.dev.json'

const projectsData =
  import.meta.env.DEV && devProjects.projects.length ? devProjects : projects

function sortFoldersFirst(nodes) {
  return [...nodes]
    .map((node) =>
      node.children
        ? { ...node, children: sortFoldersFirst(node.children) }
        : node,
    )
    .sort((a, b) => {
      if (a.kind === b.kind) return 0
      return a.kind === 'folder' ? -1 : 1
    })
}

export const fileTree = sortFoldersFirst([
  {
    id: 'about',
    label: 'about.json',
    kind: 'file',
    icon: 'json',
    route: '/about',
  },
  {
    id: 'projects',
    label: 'projects',
    kind: 'folder',
    icon: 'folder',
    route: '/projects',
    children: projectsData.projects.map((project) => ({
      id: `project-${project.id}`,
      label: `${project.id}.md`,
      kind: 'file',
      icon: 'markdown',
      route: `/projects/${project.id}`,
    })),
  },
  {
    id: 'resume',
    label: 'resume.pdf',
    kind: 'file',
    icon: 'file-pdf',
    route: '/resume',
  },
  {
    id: 'contact',
    label: 'contact.md',
    kind: 'file',
    icon: 'markdown',
    route: '/contact',
  },
  {
    id: 'education',
    label: 'education.md',
    kind: 'file',
    icon: 'mortar-board',
    route: '/education',
  },
])

export function flattenTree(nodes = fileTree) {
  return nodes.reduce((all, node) => {
    all.push(node)
    if (node.children) all.push(...flattenTree(node.children))
    return all
  }, [])
}

export function findNodeById(id) {
  return flattenTree().find((node) => node.id === id) ?? null
}

export function findNodeByRoute(route) {
  const clean = route.replace(/\/+$/, '') || '/'
  return flattenTree().find((node) => node.route === clean) ?? null
}

export function getProjectById(id) {
  return projectsData.projects.find((project) => project.id === id) ?? null
}

export function getProjects() {
  return projectsData.projects
}

export function breadcrumbsForRoute(route) {
  const clean = route.replace(/\/+$/, '') || '/'
  if (clean === '/') return ['about.json']
  const segments = clean.split('/').filter(Boolean)
  if (segments[0] === 'projects' && segments[1]) {
    return ['projects', `${segments[1]}.md`]
  }
  if (segments[0] === 'about') return ['about.json']
  if (segments[0] === 'resume') return ['resume.pdf']
  if (segments[0] === 'contact') return ['contact.md']
  if (segments[0] === 'education') return ['education.md']
  if (segments[0] === 'projects') return ['projects']
  return segments
}
