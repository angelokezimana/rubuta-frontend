import { defineStore } from 'pinia'
import {
    loginUser,
    logoutUser,
    authRequest,
    ACCESS_TOKEN,
    REFRESH_TOKEN,
} from '/src/services/api/auth'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(window.localStorage.getItem('user')),
        loginError: null,
    }),
    getters: {
        currentUser: (state) => state.user,
    },
    actions: {
        async login(data) {
            try {
                const response = await loginUser(data.email, data.password)

                /**
                 * Use this when we don't want to reload the page
                 * await this.getUser()
                 */
                this.loginError = null
                await this.getUser()
                this.router.push({ name: 'Profile' })
                /**
                 * Use this to reload the page
                 * .then(() => {
                 *      this.router.go()
                 * })
                 */
            } catch (error) {
                this.loginError = error.response.data
                this.user = null
                window.localStorage.removeItem('user')
                window.localStorage.removeItem(ACCESS_TOKEN)
                window.localStorage.removeItem(REFRESH_TOKEN)
            }
        },
        async getUser() {
            const user = await authRequest.get('/api/v1/users/me')
            // update pinia state
            this.user = user.data
            // store user details and jwt in local storage to keep user logged in between page refreshes
            window.localStorage.setItem('user', JSON.stringify(user.data))
        },
        async logout() {
            this.user = null
            window.localStorage.removeItem('user')
            await logoutUser()
            this.router.push({ name: 'Home' })
        },
    },
})
