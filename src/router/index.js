import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "../views/Auth/Login.vue"
import RegisterView from "../views/Auth/Register.vue"
import DashboardView from "../views/Dashboard.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    }
  ]
})

export default router
