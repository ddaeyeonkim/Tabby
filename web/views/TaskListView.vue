<script setup>
import { ref } from 'vue'

const tasks = ref([])
const taskName = ref('')
const estimatedTime = ref('')

async function saveTask() {
  await window.api.saveTask(taskName.value, estimatedTime.value)
  taskName.value = ''
  estimatedTime.value = ''
  const alltasks = await window.api.getAllTasks()
  tasks.value = alltasks
}
</script>

<template>
  <div>
    <h1 class="font-semibold mb-4">작업 목록</h1>
    <div class="flex w-full mb-8">
      <div class="grow me-2">
        <label class="block text-gray-700 text-sm font-semibold mb-2" for="task">업무</label>
        <input
          class="taskInput"
          type="text"
          id="task"
          placeholder="해야 할 업무"
          v-model="taskName"
          @keyup.enter.prevent="saveTask"
        />
      </div>
      <div class="w-24 me-2">
        <label class="block text-gray-700 text-sm text-end font-semibold mb-2" for="time"
          >예상시간(h)</label
        >
        <input
          class="taskInput text-end"
          type="text"
          id="time"
          placeholder="예상시간"
          v-model="estimatedTime"
          @keyup.enter.prevent="saveTask"
        />
      </div>
      <div class="self-end">
        <button class="btn" @click="saveTask">저장</button>
      </div>
    </div>
    <div v-for="task in tasks" :key="task.id">
      <p>{{ task.taskName }}</p>
    </div>
  </div>
</template>

<style scoped>
.taskInput {
  @apply appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight;
}
.taskInput:focus {
  @apply outline-none;
}
.btn {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
}
</style>
