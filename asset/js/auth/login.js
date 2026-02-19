// ១. ពិនិត្យមើល Token
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyNTUsImlhdCI6MTc3MTQ4NDAxNCwiZXhwIjoxNzcyMDg4ODE0fQ.Y3Cs0LWbXCCwcpRUdNR3H9p0sw5UvV1qqMeHkxXn-B4";
if (localStorage.getItem("token")) {
  window.location.href = "dashboard.html";
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
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("error-msg");
  const loginBtn = document.getElementById("login-btn");

  errorMsg.textContent = "";

  if (email === "" || password === "") {
    errorMsg.textContent = "សូមបញ្ចូលអ៊ីមែល និងលេខកូដសម្ងាត់របស់អ្នក។";
    return;
  }

  if (email === "") {
    errorMsg.textContent = "សូមបញ្ចូលអ៊ីមែល។";
    return;
  }
  if (password === "") {
    errorMsg.textContent = "សូមបញ្ចូលលេខកូដសម្ងាត់របស់អ្នក។";
    return;
  }

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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "អ៊ីមែល ឬលេខកូដសម្ងាត់មិនត្រឹមត្រូវ!");
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    }
  } catch (error) {
    errorMsg.textContent = error.message;
  } finally {
    loginBtn.disabled = false;
    loginBtn.innerHTML = originalText;
  }
}
