<script setup>
import { useAuthStore } from '../store'

const authStore = useAuthStore()
</script>

<template>
    <div v-if="authStore.isAuthenticated">
        <h1>Profile</h1>
        <p>
            Name: {{ authStore.user.last_name }}
            {{ authStore.user.first_name }}
        </p>
        <p>Email: {{ authStore.user.email }}</p>
    </div>
</template>
