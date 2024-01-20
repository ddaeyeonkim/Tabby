<script setup>
import { ref } from 'vue';

const info = ref(
`This app is using Chrome (v${window.api.chrome()}), Node.js (v${window.api.node()}), and Electron (v${window.api.electron()})`
)
const func = async () => {
    const response = await window.api.ping()
    console.log(response) // prints out 'pong'
}

func()
</script>

<template>
  <div>
    <h1>Home</h1>
    <p>Home page content goes here.</p>
    <p>{{  info  }}</p>
  </div>
</template>
