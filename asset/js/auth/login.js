// ១. ពិនិត្យមើល Token (ការពារកុំឱ្យចូលមកទំព័រ Login បើមាន Token រួចហើយ)
if (localStorage.getItem("token")) {
  window.location.href = "pages/dashboard.html";
}

// ២. មុខងារបិទ/បើកមើលលេខកូដ
function togglePassword() {
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.getElementById("toggleIcon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.classList.replace("bi-eye-slash", "bi-eye");
  } else {
    passwordInput.type = "password";
    toggleIcon.classList.replace("bi-eye", "bi-eye-slash");
  }
}

// ៣. មុខងារ Login
async function login() {
  console.log(1);
  
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const loginBtn = document.getElementById("login-btn");

  // ការពិនិត្យទិន្នន័យបញ្ចូល (Validation)
  if (!email || !password) {
    Swal.fire({
      icon: "warning",
      title: "សូមបំពេញព័ត៌មាន",
      text: "សូមបញ្ចូលអ៊ីមែល និងលេខកូដសម្ងាត់របស់អ្នក!",
      confirmButtonColor: "#198754",
    });
    return;
  }

  // បង្ហាញ Loading នៅលើប៊ូតុង
  const originalText = loginBtn.innerText;
  loginBtn.disabled = true;
  loginBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status"></span> កំពុងផ្ទៀងផ្ទាត់...`;

  try {
    const response = await fetch(
      "https://blogs2.csm.linkpc.net/api/v1/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      },
    );
    console.log(response);
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "អ៊ីមែល ឬលេខកូដសម្ងាត់មិនត្រឹមត្រូវ!");
    }
console.log(data.data.token);

    if (data.data.token) {
      console.log(2);
      
      // រក្សាទុក Token និងបង្ហាញ Toast ជោគជ័យ
      localStorage.setItem("token", data.data.token);

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

      await Toast.fire({
        icon: "success",
        title: "ចូលប្រើប្រាស់ជោគជ័យ",
      });

      window.location.href = "pages/dashboard.html";
    }
  } catch (error) {
    // បង្ហាញផ្ទាំង Error បើ Login មិនចូល
    Swal.fire({
      icon: "error",
      title: "បរាជ័យ",
      text: error.message,
      confirmButtonColor: "#d33",
    });
  } finally {
    // បិទ Loading វិញ
    loginBtn.disabled = false;
    loginBtn.innerHTML = originalText;
  }
}
