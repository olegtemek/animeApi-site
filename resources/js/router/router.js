import { createRouter, createWebHistory } from "vue-router";
import store from '@/store/store.js'

const routes = [
  {
    path: '/',
    component: () => import('@/views/frontend/home/Index.vue'),
    name: 'home',
    meta: {
      title: 'Home',
      middleware: "guest",
    }
  },
  {
    path: '/see/:id',
    component: () => import('@/views/frontend/anime/Index.vue'),
    name: 'see',
    meta: {
      title: 'Show anime',
      middleware: "guest",
    }
  },
  {
    path: '/login',
    component: () => import('@/views/frontend/auth/Login.vue'),
    name: 'login',
    meta: {
      title: 'Login',
      middleware: "guest",
    }
  },
  {
    path: '/register',
    component: () => import('@/views/frontend/auth/Register.vue'),
    name: 'register',
    meta: {
      title: 'Register',
      middleware: "guest",
    }
  },
  {
    path: '/profile',
    component: () => import('@/views/frontend/profile/Index.vue'),
    name: 'profile',
    meta: {
      title: 'Profile',
      middleware: "auth",
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = 'AnimeApi | ' + to.meta.title
  if (to.meta.middleware == "guest") {
    if (window.Laravel.isLoggedin && to.name == 'login') {
      next({ name: 'profile' })
    }
    next()
  } else {
    if (window.Laravel.isLoggedin) {
      next()
    } else {
      next({ name: "login" })
    }
  }
})


export default router;