<template>
  <div class="page-content">
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item"><a href="#" class="text-decoration-none">Home</a></li>
        <li class="breadcrumb-item active">Settings</li>
      </ol>
    </nav>
    <h4 class="fw-bold mb-4" style="color:#1e2a38;">
      <i class="bi bi-gear-fill me-2 text-primary"></i>Settings
    </h4>

    <div class="row g-3">
      <!-- Profile Settings -->
      <div class="col-12 col-lg-6">
        <div class="card border-0 shadow-sm" style="border-radius:12px;">
          <div class="card-header bg-white border-bottom fw-semibold py-3">
            <i class="bi bi-person-circle me-2 text-primary"></i>Profile Settings
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label class="form-label fw-semibold small">Full Name</label>
              <input type="text" class="form-control" v-model="profile.name" />
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold small">Email</label>
              <input type="email" class="form-control" v-model="profile.email" />
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold small">Role</label>
              <input type="text" class="form-control" v-model="profile.role" disabled />
            </div>
            <button class="btn btn-primary btn-sm">
              <i class="bi bi-save me-1"></i>Save Changes
            </button>
          </div>
        </div>
      </div>

      <!-- System Settings -->
      <div class="col-12 col-lg-6">
        <div class="card border-0 shadow-sm" style="border-radius:12px;">
          <div class="card-header bg-white border-bottom fw-semibold py-3">
            <i class="bi bi-sliders me-2 text-primary"></i>System Preferences
          </div>
          <div class="card-body">
            <div class="form-check form-switch mb-3">
              <input class="form-check-input" type="checkbox" id="darkMode" v-model="prefs.darkMode" />
              <label class="form-check-label" for="darkMode">Dark Mode</label>
            </div>
            <div class="form-check form-switch mb-3">
              <input class="form-check-input" type="checkbox" id="emailNotif" v-model="prefs.emailNotifications" />
              <label class="form-check-label" for="emailNotif">Email Notifications</label>
            </div>
            <div class="form-check form-switch mb-3">
              <input class="form-check-input" type="checkbox" id="twoFactor" v-model="prefs.twoFactor" />
              <label class="form-check-label" for="twoFactor">Two-Factor Authentication</label>
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold small">Language</label>
              <select class="form-select" v-model="prefs.language">
                <option>English</option>
                <option>Khmer</option>
                <option>French</option>
              </select>
            </div>
            <button class="btn btn-primary btn-sm">
              <i class="bi bi-save me-1"></i>Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const profile = reactive({
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'Administrator',
})

const prefs = reactive({
  darkMode: false,
  emailNotifications: true,
  twoFactor: false,
  language: 'English',
})
</script>
