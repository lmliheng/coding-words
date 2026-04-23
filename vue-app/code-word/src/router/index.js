import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/AuthView.vue'
import Home from '@/views/Home.vue'
import WordPage from '@/views/wordPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: '首页',
      },
    },
    {
      path: '/login',
      name: 'AuthView',
      component: AuthView,
      meta: {
        title: '登录界面',
      },
    },
    {
      path: '/word/:id',
      name: 'WordPage',
      component: WordPage,
      meta: {
        title: '单词展示',
      },
    }
  ],
})

export default router
