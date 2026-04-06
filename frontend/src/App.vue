<template>
  <TheSidebar :sidebar-open="sidebarOpen" @close="sidebarOpen = false" />

  <div class="main-wrapper" :class="{ 'sidebar-hidden': !sidebarOpen }">
    <TheNavbar @toggle="toggleSidebar">
      <template #title>{{ currentTitle }}</template>
    </TheNavbar>

    <router-view />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import TheSidebar from './components/TheSidebar.vue'
import TheNavbar from './components/TheNavbar.vue'

const sidebarOpen = ref(true)

function checkMobile() {
  if (window.innerWidth < 992) {
    sidebarOpen.value = false
  } else {
    sidebarOpen.value = true
  }
}

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const route = useRoute()
const titleMap = {
  dashboard: 'Dashboard',
  users: 'Users',
  products: 'Products',
  reports: 'Reports',
  settings: 'Settings',
}
const currentTitle = computed(() => titleMap[route.name] ?? 'Dashboard')
</script>
