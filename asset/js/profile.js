const API_BASE_URL = 'https://blogs2.csm.linkpc.net/api/v1';
const Token = localStorage.getItem("token");

const headers = {
    'Authorization': `Bearer ${Token}`,
    'Accept': 'application/json'
};

// --- ចាប់យក Elements ---
const avatarImg = document.getElementById("avatarImg");
const avatarInput = document.getElementById("avatarInput");
const displayName = document.getElementById("displayName");
const displayEmail = document.getElementById("displayEmail");
const profileForm = document.getElementById("profileForm");

// ១. មុខងារទាញទិន្នន័យ Profile (GET)
async function fetchProfile() {
    try {
        const res = await fetch(`${API_BASE_URL}/auth/profile`, { 
            method: 'GET', 
            headers: headers 
        });
        
        const result = await res.json();
        if (res.ok && result.data) {
            updateUI(result.data);
            // រក្សាទុកក្នុង LocalStorage ដើម្បីឱ្យបើកមកឃើញភ្លាមលើកក្រោយ (Fast Load)
            localStorage.setItem("user_profile", JSON.stringify(result.data));
        }
    } catch (err) { 
        console.error("Fetch Error:", err); 
    }
}

// មុខងារជំនួយសម្រាប់ Update UI
function updateUI(user) {
    if(displayName) displayName.textContent = `${user.firstName} ${user.lastName}`;
    if(displayEmail) displayEmail.textContent = user.email;
    
    if(document.getElementById('firstName')) document.getElementById('firstName').value = user.firstName;
    if(document.getElementById('lastName')) document.getElementById('lastName').value = user.lastName;
    if(document.getElementById('email')) document.getElementById('email').value = user.email;

    if(user.avatar && avatarImg) avatarImg.src = user.avatar;
}

// ២. មុខងារ Upload Avatar (Optimistic Update - ប្តូររូបភ្លាម)
avatarInput.addEventListener("change", async () => {
    const file = avatarInput.files[0];
    if (!file) return;

    // --- ជំហានទី ១: បង្ហាញរូបភាពលើ UI ភ្លាមៗដោយមិនចាំ Server ---
    const reader = new FileReader();
    reader.onload = (e) => {
        if(avatarImg) avatarImg.src = e.target.result;
    };
    reader.readAsDataURL(file);

    // --- ជំហានទី ២: ផ្ញើទៅ Server តាមក្រោយ ---
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
        } else {
            throw new Error("Upload failed");
        }
    } catch (err) {
        console.error("Upload Error:", err);
        Swal.fire('Error', 'ការ Upload រូបភាពមានបញ្ហា', 'error');
        fetchProfile(); // Rollback: ទាញរូបចាស់មកបង្ហាញវិញបើ Error
    }
});

// ៣. មុខងារ Delete Avatar
document.getElementById("btnDelAvatar").onclick = async () => {
    const confirm = await Swal.fire({
        title: 'តើអ្នកប្រាកដទេ?',
        text: "រូបភាព Profile នឹងត្រូវលុប!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'យល់ព្រម',
        cancelButtonText: 'បោះបង់'
    });

    if (confirm.isConfirmed) {
        // Optimistic Delete: លុបរូបចេញពី UI មុន
        if(avatarImg) avatarImg.src = 'path/to/default-avatar.png'; 

        try {
            const res = await fetch(`${API_BASE_URL}/profile/avatar`, {
                method: "DELETE",
                headers: headers
            });
            if (!res.ok) throw new Error();
            Swal.fire('Deleted!', 'រូបភាពត្រូវបានលុប.', 'success');
        } catch (err) {
            fetchProfile(); // បើលុបមិនចេញ ឱ្យវាបង្ហាញរូបដើមវិញ
        }
    }
};

// ៤. មុខងារ Edit Profile (Save Changes - ប្តូរអក្សរភ្លាម)
profileForm.onsubmit = async (e) => {
    e.preventDefault();
    
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;

    // --- ជំហានទី ១: Update អក្សរលើ Header ភ្លាមៗ ---
    if(displayName) displayName.textContent = `${firstName} ${lastName}`;
    if(displayEmail) displayEmail.textContent = email;
    btnedit(); // បិទ Mode Edit ភ្លាម កុំឱ្យ User រង់ចាំ

    // --- ជំហានទី ២: ផ្ញើទៅ Server ---
    try {
        const res = await fetch(`${API_BASE_URL}/profile`, {
            method: "PUT",
            headers: { ...headers, "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, email })
        });

        if (res.ok) {
            Swal.fire({ icon: 'success', title: 'រក្សាទុកជោគជ័យ', timer: 1000, showConfirmButton: false });
        } else {
            throw new Error();
        }
    } catch (err) {
        Swal.fire('Error', 'មិនអាចកែប្រែបានទេ', 'error');
        fetchProfile(); // Rollback ទិន្នន័យចាស់មកវិញ
    }
};

// ៥. មុខងារ Toggle Edit Mode
window.btnedit = function() {
    const inputs = document.querySelectorAll(".formP");
    const saveRow = document.getElementById("saveRow");
    const btnEdit = document.getElementById("btnEdit");

    const isEditing = saveRow.style.display === "none" || saveRow.style.display === "";

    if (isEditing) {
        saveRow.style.display = "flex";
        btnEdit.style.display = "none";
        inputs.forEach(input => {
            input.disabled = false;
            input.classList.add("is-edit");
        });
    } else {
        saveRow.style.display = "none";
        btnEdit.style.display = "inline-block";
        inputs.forEach(input => {
            input.disabled = true;
            input.classList.remove("is-edit");
        });
    }
};

document.getElementById("btnCancel").onclick = () => btnedit();

// ៦. បើកមកឱ្យដើរភ្លាម (Instant Load from LocalStorage)
window.onload = () => {
    const cachedUser = localStorage.getItem("user_profile");
    if (cachedUser) {
        updateUI(JSON.parse(cachedUser)); // បង្ហាញទិន្នន័យចាស់សិន (លឿនបំផុត)
    }
    fetchProfile(); // ទាញទិន្នន័យថ្មីពី Server មកផ្ទៀងផ្ទាត់តាមក្រោយ
};