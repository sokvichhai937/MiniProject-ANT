<template>
  <div class="page-content">
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item"><a href="#" class="text-decoration-none">Home</a></li>
        <li class="breadcrumb-item active">Reports</li>
      </ol>
    </nav>
    <h4 class="fw-bold mb-4" style="color:#1e2a38;">
      <i class="bi bi-bar-chart-fill me-2 text-primary"></i>Reports
    </h4>

    <div class="row g-3 mb-4">
      <div class="col-12 col-lg-6">
        <div class="card border-0 shadow-sm" style="border-radius:12px;">
          <div class="card-header bg-white border-bottom fw-semibold py-3">
            <i class="bi bi-graph-up me-2 text-success"></i>Monthly Revenue
          </div>
          <div class="card-body">
            <div class="chart-placeholder">
              <i class="bi bi-bar-chart"></i>
              <span class="fw-semibold">Bar Chart Placeholder</span>
              <small class="text-muted">Monthly revenue data will appear here</small>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-6">
        <div class="card border-0 shadow-sm" style="border-radius:12px;">
          <div class="card-header bg-white border-bottom fw-semibold py-3">
            <i class="bi bi-graph-down me-2 text-info"></i>User Growth
          </div>
          <div class="card-body">
            <div class="chart-placeholder">
              <i class="bi bi-graph-up-arrow"></i>
              <span class="fw-semibold">Line Chart Placeholder</span>
              <small class="text-muted">User growth trend will appear here</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm" style="border-radius:12px;">
      <div class="card-header bg-white border-bottom fw-semibold py-3">
        <i class="bi bi-file-earmark-text me-2 text-primary"></i>Report Summary
      </div>
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-4" v-for="metric in metrics" :key="metric.label">
            <div class="p-3 rounded-3 text-center" :style="{ backgroundColor: metric.bg }">
              <div class="fs-3 fw-bold" :style="{ color: metric.color }">{{ metric.value }}</div>
              <div class="small text-muted">{{ metric.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const metrics = [
  { label: 'Total Sales', value: '$124,500', bg: '#e8f4fd', color: '#0d6efd' },
  { label: 'New Customers', value: '3,291', bg: '#e9f7ef', color: '#198754' },
  { label: 'Avg. Order Value', value: '$67.20', bg: '#fef3e2', color: '#fd7e14' },
]
</script>
