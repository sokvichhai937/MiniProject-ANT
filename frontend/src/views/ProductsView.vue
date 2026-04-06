<template>
  <div class="page-content">
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item"><a href="#" class="text-decoration-none">Home</a></li>
        <li class="breadcrumb-item active">Products</li>
      </ol>
    </nav>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="fw-bold mb-0" style="color:#1e2a38;">
        <i class="bi bi-box-seam-fill me-2 text-primary"></i>Products
      </h4>
      <button class="btn btn-primary btn-sm">
        <i class="bi bi-plus-lg me-1"></i>Add Product
      </button>
    </div>

    <div class="row g-3">
      <div class="col-12 col-sm-6 col-xl-4" v-for="product in products" :key="product.id">
        <div class="card border-0 shadow-sm h-100" style="border-radius:12px;">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
              <span class="fw-bold text-primary fs-5">${{ product.price }}</span>
            </div>
            <h6 class="fw-semibold">{{ product.name }}</h6>
            <p class="text-muted small mb-3">{{ product.description }}</p>
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted"><i class="bi bi-box me-1"></i>Stock: {{ product.stock }}</small>
              <div>
                <button class="btn btn-sm btn-outline-primary me-1"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const products = [
  { id: 1, name: 'Pro Plan', category: 'Subscription', price: '149.00', stock: '∞', description: 'Full access to all pro features.' },
  { id: 2, name: 'Starter Pack', category: 'One-time', price: '49.00', stock: 200, description: 'Perfect for getting started quickly.' },
  { id: 3, name: 'Enterprise', category: 'Subscription', price: '399.00', stock: '∞', description: 'Advanced features for large teams.' },
  { id: 4, name: 'Analytics Add-on', category: 'Add-on', price: '29.00', stock: 500, description: 'Detailed analytics and reporting.' },
  { id: 5, name: 'Support Pack', category: 'Service', price: '79.00', stock: 100, description: 'Priority support for 12 months.' },
  { id: 6, name: 'Storage Upgrade', category: 'Add-on', price: '19.00', stock: 1000, description: 'Extra 100GB cloud storage.' },
]
</script>
