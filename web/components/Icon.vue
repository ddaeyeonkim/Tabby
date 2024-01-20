<script setup lang="ts">
import { defineProps } from 'vue'
defineProps<{
  icon: string
  size: string
  fill?: string
}>()
</script>

<template>
  <i :class="`bi-${icon}${fill === 'true' ? '-fill' : ''}`" :style="{ fontSize: `${size}px` }"></i>
</template>
