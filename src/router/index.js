import { createRouter, createWebHistory } from 'vue-router'
import profile from '@/data/profile.json'
import education from '@/data/education.json'
import { findNodeByRoute } from '@/lib/files'
import { openFile, setActiveRoute } from '@/stores/workspace'

const routes = [
  { path: '/', redirect: '/about' },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/components/content/AboutView.vue'),
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/components/content/ProjectsView.vue'),
  },
  {
    path: '/projects/:id',
    name: 'project',
    component: () => import('@/components/content/ProjectDetail.vue'),
    props: true,
  },
  {
    path: '/resume',
    name: 'resume',
    component: () => import('@/components/content/ResumeView.vue'),
    props: { resumePath: profile.resumePath },
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/components/content/ContactView.vue'),
  },
  {
    path: '/education',
    name: 'education',
    component: () => import('@/components/content/EducationView.vue'),
    props: { education },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/components/content/NotFoundView.vue'),
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  setActiveRoute(to.path)
  const node = findNodeByRoute(to.path)
  if (node) openFile(node.id)
  if (typeof document !== 'undefined') {
    document.title = node
      ? `${node.label} — ${profile.name}`
      : `${profile.name} — ${profile.role}`
  }
})

export default router
