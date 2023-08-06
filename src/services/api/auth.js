import axios from 'axios'

const BASE_URL = 'http://localhost:8000'
const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'

const tokenRequest = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
})

const loginUser = async (email, password) => {
    try {
        const loginBody = { email, password }
        const response = await tokenRequest.post(
            '/api/v1/jwt/create/',
            loginBody
        )
        window.localStorage.setItem(ACCESS_TOKEN, response.data.access)
        window.localStorage.setItem(REFRESH_TOKEN, response.data.refresh)

        authRequest.defaults.headers.Authorization = `JWT ${window.localStorage.getItem(
            ACCESS_TOKEN
        )}`

        return await Promise.resolve(response.data)
    } catch (error) {
        return await Promise.reject(error)
    }
}

const refreshToken = async () => {
    const refreshBody = { refresh: window.localStorage.getItem(REFRESH_TOKEN) }
    try {
        const response = await tokenRequest.post(
            '/api/v1/jwt/refresh/',
            refreshBody
        )
        window.localStorage.setItem(ACCESS_TOKEN, response.data.access)
        window.localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
        return await Promise.resolve(response.data)
    } catch (error) {
        return await Promise.reject(error)
    }
}

const isCorrectRefreshError = (status) => status === 401

/*
 * authRequest
 *
 * Example:
 *     authRequest.get('/path/to/endpoint/',extraParameters)
 *        .then(response=>{
 *          // do something with successful request
 *        }).catch((error)=> {
 *          // handle any errors.
 *        });
 */
const authRequest = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        Authorization: `JWT ${window.localStorage.getItem(ACCESS_TOKEN)}`,
        'Content-Type': 'application/json',
    },
})

const logoutUser = async () => {
    await authRequest.post('/api/v1/jwt/delete/', {
        refresh_token: window.localStorage.getItem(REFRESH_TOKEN),
    })
    window.localStorage.removeItem(ACCESS_TOKEN)
    window.localStorage.removeItem(REFRESH_TOKEN)
    authRequest.defaults.headers.Authorization = ''
}

const errorInterceptor = async (error) => {
    const originalRequest = error.config
    const { status } = error.response
    if (isCorrectRefreshError(status)) {
        try {
            await refreshToken()
            const headerAuthorization = `JWT ${window.localStorage.getItem(
                ACCESS_TOKEN
            )}`
            authRequest.defaults.headers.Authorization = headerAuthorization
            originalRequest.headers.Authorization = headerAuthorization
            return await authRequest(originalRequest)
        } catch (tokenRefreshError) {
            // if token refresh fails, logout the user to avoid potential security risks.
            logoutUser()
            return await Promise.reject(tokenRefreshError)
        }
    }
    return Promise.reject(error)
}

authRequest.interceptors.response.use(
    (response) => response, // this is for all successful requests.
    (error) => errorInterceptor(error) // handle the request
)

export {
    tokenRequest,
    loginUser,
    logoutUser,
    refreshToken,
    authRequest,
    errorInterceptor,
    BASE_URL,
    ACCESS_TOKEN,
    REFRESH_TOKEN,
}
