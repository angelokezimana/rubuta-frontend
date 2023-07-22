import { createRouter, createWebHistory } from 'vue-router'
import Login from '/src/views/Login.vue'
import SignUp from '/src/views/SignUp.vue'
import Profile from '/src/views/Profile.vue'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../services/api/auth'
import { useAuthStore } from '../store'

const PUBLIC_PATHS = ['/login', '/sign-up']

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUp,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const unAuthenticatedAndPrivatePage = (path) =>
    !PUBLIC_PATHS.includes(path) &&
    !(ACCESS_TOKEN in window.localStorage) &&
    !(REFRESH_TOKEN in window.localStorage)

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (unAuthenticatedAndPrivatePage(to.path)) {
        //authStore.returnUrl = to.fullPath
        authStore.user = null
        next('/login')
    }else{
        next()
    }
})

export default router
