import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/',
    component: () => import('@/views/frontend/home/Index.vue'),
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/see/:id',
    component: () => import('@/views/frontend/anime/Index.vue'),
    meta: {
      title: 'Show anime'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title += ' ' + to.meta.title
  next()
})


export default router;