<template>
  <nav class="sidebar" :class="{ open: sidebarOpen }">
    <router-link to="/" class="sidebar-brand">
      <i class="bi bi-speedometer2"></i>
      AdminPanel
    </router-link>

    <ul class="sidebar-nav">
      <li class="nav-label">Main</li>

      <li class="nav-item">
        <router-link to="/" exact-active-class="active">
          <i class="bi bi-grid-1x2-fill"></i>
          Dashboard
        </router-link>
      </li>

      <li class="nav-item">
        <router-link to="/users" active-class="active">
          <i class="bi bi-people-fill"></i>
          Users
        </router-link>
      </li>

      <li class="nav-item">
        <router-link to="/products" active-class="active">
          <i class="bi bi-box-seam-fill"></i>
          Products
        </router-link>
      </li>

      <li class="nav-label">Analytics</li>

      <li class="nav-item">
        <router-link to="/reports" active-class="active">
          <i class="bi bi-bar-chart-fill"></i>
          Reports
        </router-link>
      </li>

      <li class="nav-label">System</li>

      <li class="nav-item">
        <router-link to="/settings" active-class="active">
          <i class="bi bi-gear-fill"></i>
          Settings
        </router-link>
      </li>
    </ul>

    <div class="p-3 border-top" style="border-color: rgba(255,255,255,0.08) !important;">
      <small class="text-muted" style="font-size:0.72rem;">v1.0.0 &mdash; AdminPanel</small>
    </div>
  </nav>

  <!-- Mobile overlay -->
  <div class="sidebar-overlay" :class="{ show: sidebarOpen }" @click="$emit('close')"></div>
</template>

<script setup>
defineProps({
  sidebarOpen: Boolean,
})
defineEmits(['close'])
</script>
