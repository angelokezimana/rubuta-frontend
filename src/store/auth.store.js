import { defineStore } from 'pinia'
import jwt_decode from 'jwt-decode'
import { loginUser, logoutUser } from '/src/services/api/auth'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage
        token: window.localStorage.getItem('access_token'),
    }),
    getters: {
        user: (state) => {
            if (!state.token) return null

            const decoded = jwt_decode(state.token)
            return {
                first_name: decoded.first_name,
                last_name: decoded.last_name,
                email: decoded.email,
                birthdate: decoded.birthdate,
                phone: decoded.phone,
                image: decoded.image,
            }
        },
        isAuthenticated() {
            return this.user ? true : false
        },
    },
    actions: {
        async login(data) {
            try {
                await loginUser(data.email, data.password)
                /**
                 * Use this when we don't want to reload the page
                 * this.token = window.localStorage.getItem('access_token')
                 */
                this.router.push({ name: 'Profile' }).then(() => {
                    this.router.go()
                })
            } catch (error) {
                console.log(error)
            }
        },
        async logout() {
            await logoutUser()
            this.router.push({ name: 'Login' }).then(() => {
                this.router.go()
            })
        },
    },
})
