<script setup>
import { ref } from 'vue';

const info = ref(
`This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`
)
const func = async () => {
    const response = await window.versions.ping()
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
