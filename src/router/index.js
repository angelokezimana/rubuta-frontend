import { createRouter, createWebHistory } from 'vue-router'
import Login from '/src/components/Login.vue'
import Home from '/src/components/Home.vue'

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
