<template>
  <div class="page-content">
    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item"><a href="#" class="text-decoration-none">Home</a></li>
        <li class="breadcrumb-item active">Dashboard</li>
      </ol>
    </nav>

    <h4 class="fw-bold mb-4" style="color:#1e2a38;">
      <i class="bi bi-grid-1x2-fill me-2 text-primary"></i>Dashboard Overview
    </h4>

    <!-- Stat Cards -->
    <div class="row g-3 mb-4">
      <div class="col-12 col-sm-6 col-xl-3" v-for="stat in stats" :key="stat.label">
        <StatCard v-bind="stat" />
      </div>
    </div>

    <!-- Charts row -->
    <div class="row g-3 mb-4">
      <div class="col-12 col-lg-8">
        <div class="card border-0 shadow-sm" style="border-radius:12px;">
          <div class="card-header bg-white border-bottom fw-semibold py-3">
            <i class="bi bi-graph-up-arrow me-2 text-primary"></i>Revenue Overview
          </div>
          <div class="card-body">
            <div class="chart-placeholder">
              <i class="bi bi-bar-chart-line"></i>
              <span class="fw-semibold">Chart Placeholder</span>
              <small class="text-muted">Integrate Chart.js or ApexCharts here</small>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-4">
        <div class="card border-0 shadow-sm h-100" style="border-radius:12px;">
          <div class="card-header bg-white border-bottom fw-semibold py-3">
            <i class="bi bi-pie-chart-fill me-2 text-primary"></i>Traffic Sources
          </div>
          <div class="card-body">
            <div class="chart-placeholder">
              <i class="bi bi-pie-chart"></i>
              <span class="fw-semibold">Donut Chart</span>
              <small class="text-muted">Placeholder</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="row">
      <div class="col-12">
        <OrdersTable />
      </div>
    </div>
  </div>
</template>

<script setup>
import StatCard from '../components/StatCard.vue'
import OrdersTable from '../components/OrdersTable.vue'

const stats = [
  {
    label: 'Total Revenue',
    value: '$48,295',
    change: '12.5% vs last month',
    positive: true,
    icon: 'bi-currency-dollar',
    iconBg: '#e8f4fd',
    iconColor: '#0d6efd',
  },
  {
    label: 'Total Orders',
    value: '1,843',
    change: '8.2% vs last month',
    positive: true,
    icon: 'bi-cart-fill',
    iconBg: '#fef3e2',
    iconColor: '#fd7e14',
  },
  {
    label: 'Active Users',
    value: '9,241',
    change: '3.1% vs last month',
    positive: true,
    icon: 'bi-people-fill',
    iconBg: '#e9f7ef',
    iconColor: '#198754',
  },
  {
    label: 'Conversion Rate',
    value: '3.68%',
    change: '0.4% vs last month',
    positive: false,
    icon: 'bi-arrow-repeat',
    iconBg: '#fde8f0',
    iconColor: '#d63384',
  },
]
</script>
