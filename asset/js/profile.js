/**
 * Profile Management Module
 * Features: GET, UPDATE, UPLOAD, DELETE, UI Sync, and Validation
 */

const API_BASE_URL = 'https://blogs2.csm.linkpc.net/api/v1';
const Token = localStorage.getItem("token");

if (!Token) {
    window.location.href = "../login.html";
}

const headers = {
    'Authorization': `Bearer ${Token}`,
    'Accept': 'application/json'
};

// --- ១. មុខងារ Validation (ត្រួតពិនិត្យទិន្នន័យ) ---
function validateProfile(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!data.firstName || data.firstName.length < 2) {
        Swal.fire('កំហុស', 'នាមត្រកូលត្រូវមានយ៉ាងតិច ២ តួអក្សរ', 'warning');
        return false;
    }
    if (!data.lastName || data.lastName.length < 2) {
        Swal.fire('កំហុស', 'នាមខ្លួនត្រូវមានយ៉ាងតិច ២ តួអក្សរ', 'warning');
        return false;
    }
    if (!emailRegex.test(data.email)) {
        Swal.fire('កំហុស', 'ទម្រង់អ៊ីមែលមិនត្រឹមត្រូវឡើយ', 'warning');
        return false;
    }
    return true;
}

// --- ២. មុខងារ Update UI នៅគ្រប់កន្លែង ---
function updateUserInformationUI(user) {
    const fullName = `${user.firstName} ${user.lastName}`;

    // Card UI
    const displayName = document.getElementById("displayName");
    const displayEmail = document.getElementById("displayEmail");
    if (displayName) displayName.textContent = fullName;
    if (displayEmail) displayEmail.textContent = user.email;

    // Topbar UI (Update ឈ្មោះខាងលើ)
    const topbarName = document.querySelector(".profile-pill span.fw-bold");
    if (topbarName) {
        topbarName.textContent = fullName;
    }

    if (user.avatar) {
        updateAvatarUI(user.avatar);
    }
}

// --- ៣. ទាញទិន្នន័យ Profile ---
async function fetchProfile() {
    try {
        const res = await fetch(`${API_BASE_URL}/profile`, {
            method: 'GET',
            headers: headers
        });
        const result = await res.json();

        if (res.ok && result.data) {
            const user = result.data;
            document.getElementById('firstName').value = user.firstName || '';
            document.getElementById('lastName').value = user.lastName || '';
            document.getElementById('email').value = user.email || '';
            updateUserInformationUI(user);
        }
    } catch (err) {
        console.error("Fetch Profile Error:", err);
    }
}

// --- ៤. កែប្រែព័ត៌មាន (ជាមួយ Validation) ---
function setupProfileForm() {
    const profileForm = document.getElementById("profileForm");
    if (!profileForm) return;

    profileForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const payload = {
            firstName: document.getElementById("firstName").value.trim(),
            lastName: document.getElementById("lastName").value.trim(),
            email: document.getElementById("email").value.trim()
        };

        // ✅ ហៅមុខងារ Validation មុននឹងផ្ញើទៅ Server
        if (!validateProfile(payload)) return;

        const btnSave = document.getElementById("btnSave");
        const originalText = btnSave.innerHTML;
        btnSave.disabled = true;
        btnSave.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> កំពុងរក្សាទុក...`;

        try {
            const res = await fetch(`${API_BASE_URL}/profile`, {
                method: "PUT",
                headers: { ...headers, 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await res.json();

            if (res.ok) {
                await Swal.fire({ icon: 'success', title: 'រក្សាទុកជោគជ័យ', timer: 1500, showConfirmButton: false });
                window.btnedit();
                await fetchProfile(); // Update Topbar UI
            } else {
                throw new Error(result.message || "មិនអាចកែប្រែបានទេ");
            }
        } catch (err) {
            Swal.fire('បរាជ័យ', err.message, 'error');
        } finally {
            btnSave.disabled = false;
            btnSave.innerHTML = originalText;
        }
    });
}

// --- ៥. Upload & Delete Avatar ---
function setupAvatarUpload() {
    const avatarInput = document.getElementById("avatarInput");
    if (!avatarInput) return;

    avatarInput.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // ឆែកទំហំរូបភាព (កុំឱ្យលើស 2MB)
        if (file.size > 2 * 1024 * 1024) {
            Swal.fire('កំហុស', 'រូបភាពមិនត្រូវលើសពី 2MB ឡើយ', 'error');
            return;
        }

        updateAvatarUI(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("avatar", file);

        try {
            const res = await fetch(`${API_BASE_URL}/profile/avatar`, {
                method: "POST",
                headers: { 'Authorization': `Bearer ${Token}` },
                body: formData
            });

            if (res.ok) {
                Swal.fire({ icon: 'success', title: 'ប្តូររូបភាពជោគជ័យ', timer: 1000, showConfirmButton: false });
                fetchProfile();
            } else {
                fetchProfile();
                Swal.fire('បរាជ័យ', 'មិនអាច Upload រូបភាពបានទេ', 'error');
            }
        } catch (err) {
            fetchProfile();
        }
    });
}

window.btnDelAvatar = async function() {
    const result = await Swal.fire({
        title: 'លុបរូបភាព?',
        text: "តើអ្នកចង់លុបរូបភាពចេញមែនទេ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'យល់ព្រម',
        cancelButtonText: 'បោះបង់'
    });

    if (result.isConfirmed) {
        try {
            const res = await fetch(`${API_BASE_URL}/profile/avatar`, { method: "DELETE", headers: headers });
            if (res.ok) {
                updateAvatarUI("https://i.pravatar.cc/200?img=12");
                Swal.fire('ជោគជ័យ', 'រូបភាពត្រូវបានលុប', 'success');
                fetchProfile(); // Update Topbar
            }
        } catch (err) {
            console.error(err);
        }
    }
}

// --- ៦. Helper Functions ---
function updateAvatarUI(url) {
    const mainAvatar = document.getElementById("avatarImg");
    const topAvatar = document.querySelector(".avatar");
    if (mainAvatar) mainAvatar.src = url;
    if (topAvatar) topAvatar.src = url;
}

window.btnedit = function() {
    const form = document.getElementById("profileForm");
    const saveRow = document.getElementById("saveRow");
    const btnEdit = document.getElementById("btnEdit");
    const inputs = document.querySelectorAll(".formP");

    const isEditing = form.classList.toggle("is-editing");
    saveRow.style.display = isEditing ? "flex" : "none";
    btnEdit.style.display = isEditing ? "none" : "inline-block";
    inputs.forEach(input => input.disabled = !isEditing);
}

// --- ៧. ចាប់ផ្តើមដំណើរការ ---
document.addEventListener("DOMContentLoaded", () => {
    fetchProfile();
    setupAvatarUpload();
    setupProfileForm();

    document.getElementById("btnEdit")?.addEventListener("click", window.btnedit);

    document.querySelectorAll(".logout-trigger").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            new bootstrap.Modal(document.getElementById('logoutModal')).show();
        });
    });

    document.getElementById("confirmLogout")?.addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "../index.html";
    });
});