<template>
  <div class="card stat-card h-100">
    <div class="card-body">
      <div class="stat-icon" :style="{ backgroundColor: iconBg }">
        <i :class="`bi ${icon}`" :style="{ color: iconColor }"></i>
      </div>
      <div class="stat-info">
        <div class="label">{{ label }}</div>
        <div class="value">{{ value }}</div>
        <div class="change" :class="changeClass">
          <i :class="changeIcon"></i> {{ change }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: String, required: true },
  change: { type: String, default: '' },
  positive: { type: Boolean, default: true },
  icon: { type: String, default: 'bi-bar-chart' },
  iconBg: { type: String, default: '#e8f0fe' },
  iconColor: { type: String, default: '#3d8ef8' },
})

const changeClass = computed(() =>
  props.positive ? 'text-success' : 'text-danger'
)
const changeIcon = computed(() =>
  props.positive ? 'bi bi-arrow-up-short' : 'bi bi-arrow-down-short'
)
</script>
