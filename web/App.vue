<script setup>
import SideBarLabel from './components/main/SideBarLabel.vue'
import { RouterLink, RouterView } from 'vue-router'
import Icon from './components/Icon.vue'
</script>

<template>
  <header>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
    />
  </header>
  <div class="flex h-screen antialiased bg-gray-50 text-gray-800">
    <div class="sidebar">
      <div class="p-4 font-bold border-b">Tabby</div>
      <div class="overflow-y-auto overflow-x-hidden flex-grow">
        <nav>
          <ul class="flex flex-col py-4 space-y-1">
            <SideBarLabel label="Menu" />
            <RouterLink to="/" class="navItem">
              <span class="navItemIcon">
                <Icon icon="house-door" size="18" />
              </span>
              <span class="navItemLabel"> Home </span>
            </RouterLink>
            <RouterLink to="/about" class="navItem">
              <span class="navItemIcon">
                <Icon icon="clock-history" size="18" />
              </span>
              <span class="navItemLabel"> History </span>
            </RouterLink>
          </ul>
        </nav>
      </div>
    </div>
    <main class="flex-1">
      <RouterView class="main" />
    </main>
  </div>
</template>

<style scoped>
.sidebar {
  @apply flex flex-col flex-shrink-0 top-0 left-0 w-44 bg-white h-full border-r;
}
.main {
  @apply flex flex-col items-start flex-1 h-full min-h-screen p-8 overflow-x-hidden overflow-y-auto;
}
.navItem {
  @apply relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6;
}
.navItemIcon {
  @apply inline-flex justify-center items-center ml-4;
}
.navItemLabel {
  @apply ml-2 text-sm tracking-wide truncate;
}
</style>
