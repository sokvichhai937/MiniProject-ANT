<template>
  <div class="page-content">
    <nav aria-label="breadcrumb" class="mb-3">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item"><a href="#" class="text-decoration-none">Home</a></li>
        <li class="breadcrumb-item active">Users</li>
      </ol>
    </nav>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="fw-bold mb-0" style="color:#1e2a38;">
        <i class="bi bi-people-fill me-2 text-primary"></i>Users
      </h4>
      <button class="btn btn-primary btn-sm">
        <i class="bi bi-plus-lg me-1"></i>Add User
      </button>
    </div>

    <div class="card border-0 shadow-sm" style="border-radius:12px; overflow:hidden;">
      <div class="card-header bg-white border-bottom d-flex justify-content-between align-items-center py-3">
        <span class="fw-semibold">All Users</span>
        <input type="search" class="form-control form-control-sm w-auto" placeholder="Search users…">
      </div>
      <div class="table-responsive">
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td class="fw-semibold">{{ user.name }}</td>
              <td class="text-muted">{{ user.email }}</td>
              <td><span class="badge bg-secondary rounded-pill">{{ user.role }}</span></td>
              <td>
                <span class="badge rounded-pill" :class="user.active ? 'bg-success' : 'bg-danger'">
                  {{ user.active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td>
                <button class="btn btn-sm btn-outline-primary me-1"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', active: true },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', active: true },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', active: false },
  { id: 4, name: 'David Lee', email: 'david@example.com', role: 'Editor', active: true },
  { id: 5, name: 'Eva Martinez', email: 'eva@example.com', role: 'Viewer', active: true },
]
</script>
