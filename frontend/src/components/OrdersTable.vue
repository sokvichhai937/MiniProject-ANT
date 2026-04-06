<template>
  <div class="card table-card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <span><i class="bi bi-receipt me-2 text-primary"></i>Recent Orders</span>
      <button class="btn btn-sm btn-outline-primary">View All</button>
    </div>
    <div class="card-body p-0">
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td class="fw-semibold text-primary">#{{ order.id }}</td>
              <td>{{ order.customer }}</td>
              <td>{{ order.product }}</td>
              <td class="text-muted">{{ order.date }}</td>
              <td class="fw-semibold">${{ order.amount }}</td>
              <td>
                <span class="badge rounded-pill" :class="statusClass(order.status)">
                  {{ order.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const orders = [
  { id: '10021', customer: 'Alice Johnson', product: 'Pro Plan', date: 'Apr 5, 2026', amount: '149.00', status: 'Completed' },
  { id: '10020', customer: 'Bob Smith', product: 'Starter Pack', date: 'Apr 4, 2026', amount: '49.00', status: 'Pending' },
  { id: '10019', customer: 'Carol White', product: 'Enterprise', date: 'Apr 4, 2026', amount: '399.00', status: 'Completed' },
  { id: '10018', customer: 'David Lee', product: 'Pro Plan', date: 'Apr 3, 2026', amount: '149.00', status: 'Processing' },
  { id: '10017', customer: 'Eva Martinez', product: 'Starter Pack', date: 'Apr 2, 2026', amount: '49.00', status: 'Cancelled' },
]

function statusClass(status) {
  const map = {
    Completed: 'bg-success',
    Pending: 'bg-warning text-dark',
    Processing: 'bg-info text-dark',
    Cancelled: 'bg-danger',
  }
  return map[status] || 'bg-secondary'
}
</script>
