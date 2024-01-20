<script setup>
import { ref } from 'vue'

const tasks = ref([])

async function saveTask() {
  await window.api.saveTask('task 1')
  const alltasks = await window.api.getAllTasks()
  console.log(alltasks)
  tasks.value = alltasks
}
</script>

<template>
  <div>
    <h1 class="font-semibold">Tasks</h1>
    <button class="btn" @click="saveTask">Save Task</button>
    <div v-for="task in tasks" :key="task.id">
      <p>{{ task.taskName }}</p>
    </div>
  </div>
</template>

<style scoped></style>
