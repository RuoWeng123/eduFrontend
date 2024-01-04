import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginPage.vue'
import ManagePage from '@/views/ManagePage.vue'
import VideoPage from '@/views/VideoPage.vue'
import InnerContainer from '@/views/InnerContainer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      redirect() {
        return '/'
      }
    },
    {
      path: '/inner',
      component: InnerContainer,
      redirect() {
        return '/inner/video'
      },
      children:[
        {
          path: '/inner/video',
          name: 'video',
          component: VideoPage
        },
        {
          path: '/inner/manage',
          name: 'manage',
          component: ManagePage
        }
      ]
    }
  ]
})

export default router
