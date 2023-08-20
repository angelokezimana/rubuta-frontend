<script setup>
import NavBar from '/src/components/NavBar.vue'
import { useAuthStore } from '../store'

const authStore = useAuthStore()
</script>

<template>
    <NavBar />
    <div v-if="authStore.currentUser">
        <h1>Profile</h1>
        <p>
            Name: {{ authStore.currentUser.last_name }}
            {{ authStore.currentUser.first_name }}
        </p>
        <p>Email: {{ authStore.currentUser.email }}</p>
    </div>
</template>
