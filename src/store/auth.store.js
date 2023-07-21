import { defineStore } from 'pinia'
import { loginUser, logoutUser, authRequest } from '/src/services/api/auth'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
    }),
    getters: {
        currentUser: (state) => state.user,
    },
    actions: {
        async login(data) {
            try {
                await loginUser(data.email, data.password)
                this.router.push('/profile')
            } catch (error) {
                console.log(error)
                this.user = null
                localStorage.removeItem('user')
                logoutUser()
            }
        },
        async getUser() {
            const user = await authRequest.get('/api/v1/account/me')
            // update pinia state
            this.user = user.data
            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user.data))
        },
        logout() {
            this.user = null
            localStorage.removeItem('user')
            logoutUser()
            this.router.push('/login')
        },
    },
})
