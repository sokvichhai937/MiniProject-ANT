const API_BASE_URL = 'https://blogs2.csm.linkpc.net/api/v1';
const Token = localStorage.getItem("token");

const headers = {
    'Authorization': `Bearer ${Token}`,
    'Accept': 'application/json'
};

// --- មុខងារបង្ហាញ/លាក់ Form កែប្រែ ---
function btnedit() {
    const form = document.getElementById("profileForm");
    const saveRow = document.getElementById("saveRow");
    const inputs = document.querySelectorAll(".formP");
    const btnEdit = document.getElementById("btnEdit");

    if (form.classList.contains("is-editing")) {
        form.classList.remove("is-editing");
        saveRow.style.display = "none";
        btnEdit.style.display = "inline-block";
        inputs.forEach(input => input.disabled = true);
    } else {
        form.classList.add("is-editing");
        saveRow.style.display = "flex";
        btnEdit.style.display = "none";
        inputs.forEach(input => input.disabled = false);
    }
}

// --- មុខងារទាញទិន្នន័យ Profile (GET) ---
async function fetchProfile() {
    try {
        const res = await fetch(`${API_BASE_URL}/profile`, { headers });
        const result = await res.json();
        if (res.ok && result.data) {
            const user = result.data;
            document.getElementById('firstName').value = user.firstName;
            document.getElementById('lastName').value = user.lastName;
            document.getElementById('email').value = user.email;
            document.getElementById("displayName").textContent = `${user.firstName} ${user.lastName}`;
            document.getElementById("displayEmail").textContent = user.email;
            if(user.avatar) document.getElementById("avatarImg").src = user.avatar;
        }
    } catch (err) { console.error(err); }
}

// --- មុខងារកែប្រែ Profile (PUT) ---
document.getElementById("profileForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim()
    };

    try {
        const res = await fetch(`${API_BASE_URL}/profile`, {
            method: "PUT",
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            Swal.fire({ icon: 'success', title: 'កែប្រែជោគជ័យ', timer: 1500, showConfirmButton: false });
            btnedit(); // បិទ Form វិញ
            fetchProfile(); // Update ការបង្ហាញ
        }
    } catch (err) { console.error(err); }
});

// --- មុខងារលុបរូបភាព Profile (DELETE) ---
async function btnDelAvatar() {
    const result = await Swal.fire({
        title: 'តើអ្នកចង់លុបរូបភាពមែនទេ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'លុប',
        cancelButtonText: 'បោះបង់'
    });

    if (result.isConfirmed) {
        try {
            const res = await fetch(`${API_BASE_URL}/profile/avatar`, {
                method: "DELETE",
                headers: headers
            });
            if (res.ok) {
                document.getElementById("avatarImg").src = "https://i.pravatar.cc/200?img=12"; // រូបភាព Default
                Swal.fire('ជោគជ័យ', 'រូបភាពត្រូវបានលុប', 'success');
            }
        } catch (err) { console.error(err); }
    }
}

// --- មុខងារប្តូររូបភាពភ្លាមៗ (Instant Preview) ---
document.getElementById("avatarInput").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Instant Preview
    const tempUrl = URL.createObjectURL(file);
    document.getElementById("avatarImg").src = tempUrl;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
        await fetch(`${API_BASE_URL}/profile/avatar`, {
            method: "POST",
            headers: { 'Authorization': `Bearer ${Token}` },
            body: formData
        });
        Swal.fire({ icon: 'success', title: 'ប្តូររូបភាពរួចរាល់', timer: 1000, showConfirmButton: false });
    } catch (err) { console.error(err); }
});

// --- បញ្ចូក Event Listeners ---
document.getElementById("avatarDel").addEventListener("click", btnDelAvatar);

document.addEventListener("DOMContentLoaded", fetchProfile);
document.getElementById("btnEdit").addEventListener("click", btnedit);
document.getElementById("btnDelAvatar").addEventListener("click", btnDelAvatar);