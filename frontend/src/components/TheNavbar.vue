<template>
  <header class="topbar">
    <button class="topbar-toggle" @click="$emit('toggle')" aria-label="Toggle sidebar">
      <i class="bi bi-list"></i>
    </button>

    <span class="topbar-title">
      <slot name="title">Dashboard</slot>
    </span>

    <div class="topbar-right">
      <!-- Notifications -->
      <button class="btn btn-light btn-sm position-relative" title="Notifications">
        <i class="bi bi-bell"></i>
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size:0.6rem;">
          3
        </span>
      </button>

      <!-- User dropdown -->
      <div class="dropdown">
        <button
          class="btn btn-light btn-sm d-flex align-items-center gap-2"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span class="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
                style="width:28px;height:28px;font-size:0.75rem;font-weight:700;">
            AD
          </span>
          <span class="d-none d-md-inline">Admin</span>
          <i class="bi bi-chevron-down" style="font-size:0.7rem;"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0">
          <li>
            <a class="dropdown-item" href="#">
              <i class="bi bi-person me-2"></i>Profile
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              <i class="bi bi-gear me-2"></i>Account Settings
            </a>
          </li>
          <li><hr class="dropdown-divider"></li>
          <li>
            <a class="dropdown-item text-danger" href="#">
              <i class="bi bi-box-arrow-right me-2"></i>Sign Out
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
defineEmits(['toggle'])
</script>
