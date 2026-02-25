//let token = localStorage.getItem("token");
// មុខងារសម្រាប់បង្ហាញ Modal ពេលចុចលើប៊ូតុង Logout ក្នុង Sidebar ឬ Profile Dropdown
document.querySelectorAll(".logout-trigger").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    // បង្ហាញ Bootstrap Modal
    const modalEl = document.getElementById("logoutModal");
    if (!modalEl) {
      return;
    }
    const logoutModal = new bootstrap.Modal(modalEl);
    logoutModal.show();
  });
});

// មុខងារចាកចេញពិតប្រាកដ (លុប Token និងបញ្ជូនទៅទំព័រ Login)
document.getElementById("confirmLogout")?.addEventListener("click", (e) => {
  e.preventDefault();
  // ១. លុប Token ចេញពី localStorage
  localStorage.removeItem("token");
  // ២. បញ្ជូនអ្នកប្រើប្រាស់ទៅកាន់ទំព័រ Login
  window.location.href = "../index.html";
});
(function () {
  const token = localStorage.getItem("token");
})();

// ============ Get Profile ========================================
function getProfile(){
       fetch('https://blogs2.csm.linkpc.net/api/v1/auth/profile',{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        document.getElementById('avatarUser').src = data.data.avatar;
        document.getElementById('profileUser').textContent = data.data.firstName + " " + data.data.lastName;
      })
      .catch(err => {
        console.log(err);
      })
    }
    getProfile();


