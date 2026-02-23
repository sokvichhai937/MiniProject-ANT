let token = localStorage.getItem("token") || sessionStorage.getItem("token");


// មុខងារសម្រាប់បង្ហាញ Modal ពេលចុចលើប៊ូតុង Logout ក្នុង Sidebar ឬ Profile Dropdown
document.querySelectorAll(".logout-trigger").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    // បង្ហាញ Bootstrap Modal
    const logoutModal = new bootstrap.Modal(
      document.getElementById("logoutModal"),
    );
    logoutModal.show();
  });
});

// មុខងារចាកចេញពិតប្រាកដ (លុប Token និងបញ្ជូនទៅទំព័រ Login)
document.getElementById("confirmLogout")?.addEventListener("click", () => {
  // ១. លុប Token ចេញពី localStorage
  localStorage.removeItem("token");

  // ២. បញ្ជូនអ្នកប្រើប្រាស់ទៅកាន់ទំព័រ Login
  window.location.href = "../index.html";
});



