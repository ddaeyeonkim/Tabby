<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import { ref, onMounted } from 'vue'

const users = ref([])

async function getAllUsers() {
  const allUsers = await window.api.getAllUsers()
  users.value = allUsers
}

async function saveUser() {
  await window.api.saveUser()
  await getAllUsers()
}

onMounted(async () => {
  await getAllUsers()
})
</script>

<template>
  <main>
    <button class="btn" @click="saveUser">Save User</button>
    <div v-for="user in users" :key="user.id">{{ user.firstName }} {{ user.lastName }}</div>
  </main>
</template>

<style scoped>
.btn {
  @apply px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-red-700;
}
</style>
