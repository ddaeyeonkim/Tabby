<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { db } from '../local/db'
import type { Task } from '../local/entity/Task'

const tasks = ref<Task[]>([])
const taskName = ref('')
const estimatedTime = ref('')

async function saveTask() {
  if (!taskName.value && !estimatedTime.value) return
  const task: Task = {
    taskName: taskName.value,
    estimatedDurationHours: +estimatedTime.value,
    createdAt: new Date(),
    isCompleted: false
  }
  await db.tasks.add(task)

  taskName.value = ''
  estimatedTime.value = ''
  await getAll()
}

async function getAll() {
  tasks.value = await db.tasks.orderBy('createdAt').reverse().toArray()
}

async function toggleTask(id: number | undefined, isCompleted: boolean) {
  console.log(id, isCompleted)
  if (!id) return
  await db.tasks.update(id, { isCompleted: isCompleted })
  await getAll()
  console.log(tasks.value)
}

onMounted(() => {
  getAll()
})
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
    <div class="flex-row w-full">
      <ul class="flex-row w-full">
        <li
          v-for="task in tasks"
          :key="task.id"
          :class="[task.isCompleted ? 'taskRowComplete' : 'taskRow']"
        >
          <input
            type="checkbox"
            v-model="task.isCompleted"
            @click.prevent="toggleTask(task.id, !task.isCompleted)"
            name="checkbox"
            class="size-5 text-blue-600 bg-gray-100 border-gray-300 rounded"
          />
          <label
            :class="[
              'w-full py-4 ms-2 text-sm font-medium',
              task.isCompleted ? 'text-gray-400 line-through' : 'text-gray-900'
            ]"
            >{{ task.taskName }}</label
          >
          <span class="w-24 text-sm font-medium text-gray-500 text-end"
            >{{ task.estimatedDurationHours }}h</span
          >
        </li>
      </ul>
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
.taskRow {
  @apply flex items-center px-4 border border-gray-200 rounded-lg bg-white mb-1;
}
.taskRowComplete {
  @apply flex items-center px-4 border border-gray-200 rounded-lg bg-gray-100 mb-1;
}
</style>
