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
    password2: '',
})

function submitForm() {
    const formData = {
        first_name: form.value.first_name,
        last_name: form.value.last_name,
        email: form.value.email,
        password: form.value.password,
        password2: form.value.password2,
    }

    tokenRequest
        .post('/api/v1/account/register/', formData)
        .then((response) => {
            console.log(response)
            router.push({
                name: 'Login',
            })
        })
        .catch((error) => {
            console.log(error)
        })
}
</script>
<template>
    <div
        class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
    >
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <!-- <img
                class="mx-auto h-10 w-auto"
                src="default.pn"
                alt="Your Company"
            /> -->
            <h2
                class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
            >
                Create your account
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form @submit.prevent="submitForm" class="space-y-6">
                <div>
                    <label
                        for="first_name"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >First name</label
                    >
                    <div class="mt-2">
                        <input
                            id="first_name"
                            name="first_name"
                            v-model="form.first_name"
                            type="text"
                            autocomplete="given-name"
                            required=""
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <label
                        for="last_name"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Last name</label
                    >
                    <div class="mt-2">
                        <input
                            id="last_name"
                            name="last_name"
                            v-model="form.last_name"
                            type="text"
                            autocomplete="family-name"
                            required=""
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <label
                        for="email"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Email address</label
                    >
                    <div class="mt-2">
                        <input
                            id="email"
                            name="email"
                            v-model="form.email"
                            type="email"
                            autocomplete="email"
                            required=""
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <label
                        for="password"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Password</label
                    >
                    <div class="mt-2">
                        <input
                            id="password"
                            name="password"
                            v-model="form.password"
                            type="password"
                            autocomplete="new-password"
                            required=""
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <label
                        for="password2"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Confirm Password</label
                    >
                    <div class="mt-2">
                        <input
                            id="password2"
                            name="password2"
                            v-model="form.password2"
                            type="password"
                            autocomplete="new-password"
                            required=""
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
            <p class="mt-10 text-center text-sm text-gray-500">
                Do you have an account?
                {{ ' ' }}

                <router-link
                    :to="{ name: 'Login' }"
                    class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >Log in</router-link
                >
            </p>
        </div>
    </div>
</template>
