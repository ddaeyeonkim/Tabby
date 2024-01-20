<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <TheWelcome />
    <div class="flex flex-row">
      <div class="basis-1/4 btn">01</div>
      <div class="basis-1/4 btn">02</div>
      <div class="basis-1/2 btn">03</div>
    </div>
  </main>
</template>

<style scoped>
.btn {
  @apply px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-red-700;
}
</style>
