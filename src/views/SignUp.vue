<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { tokenRequest } from '../services/api/auth'

const router = useRouter()

const form = ref({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    re_password: '',
})

const errors = ref([])

const submitForm = async () => {
    const formData = {
        first_name: form.value.first_name,
        last_name: form.value.last_name,
        email: form.value.email,
        password: form.value.password,
        re_password: form.value.re_password,
    }

    try {
        await tokenRequest.post('/api/v1/users/', formData)
        router.push({
            name: 'Login',
        })
    } catch (error) {
        errors.value = error.response.data
    }
}
</script>
<template>
    <div>
        <div>
            <h2>Create your account</h2>
        </div>

        <div>
            <ul v-if="errors" style="color: rgb(214, 16, 16)">
                <li v-for="(value, index) in errors" :key="index">
                    {{ value }}
                </li>
            </ul>
            <form @submit.prevent="submitForm">
                <div>
                    <label for="first_name">First name</label>
                    <div>
                        <input
                            id="first_name"
                            v-model="form.first_name"
                            name="first_name"
                            type="text"
                            autocomplete="given-name"
                            required=""
                        />
                    </div>
                </div>

                <div>
                    <label for="last_name">Last name</label>
                    <div>
                        <input
                            id="last_name"
                            v-model="form.last_name"
                            name="last_name"
                            type="text"
                            autocomplete="family-name"
                            required=""
                        />
                    </div>
                </div>

                <div>
                    <label for="email">Email address</label>
                    <div>
                        <input
                            id="email"
                            v-model="form.email"
                            name="email"
                            type="email"
                            autocomplete="email"
                            required=""
                        />
                    </div>
                </div>

                <div>
                    <label for="password">Password</label>
                    <div>
                        <input
                            id="password"
                            v-model="form.password"
                            name="password"
                            type="password"
                            autocomplete="new-password"
                            required=""
                        />
                    </div>
                </div>

                <div>
                    <label for="re_password">Confirm Password</label>
                    <div>
                        <input
                            id="re_password"
                            v-model="form.re_password"
                            name="re_password"
                            type="password"
                            autocomplete="new-password"
                            required=""
                        />
                    </div>
                </div>

                <div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
            <p>
                Do you have an account?
                {{ ' ' }}

                <router-link :to="{ name: 'Login' }">Log in</router-link>
            </p>
        </div>
    </div>
</template>
