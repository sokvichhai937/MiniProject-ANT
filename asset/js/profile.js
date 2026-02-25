const API_BASE_URL = 'https://blogs2.csm.linkpc.net/api/v1';
const Token = localStorage.getItem("token");

const headers = {
    'Authorization': `Bearer ${Token}`,
    'Accept': 'application/json'
};

// --- ចាប់យក Elements (បន្ថែមការឆែក Null ដើម្បីការពារ error) ---
const avatarImg = document.getElementById("avatarImg");
const avatarInput = document.getElementById("avatarInput");
const displayName = document.getElementById("displayName");
const displayEmail = document.getElementById("displayEmail");


// ១. មុខងារទាញទិន្នន័យ Profile (GET /auth/profile)
async function fetchProfile() {
    try {
        const res = await fetch(`${API_BASE_URL}/auth/profile`, { 
            method: 'GET', 
            headers: headers 
        });
        
        const result = await res.json();
        if (res.ok && result.data) {
            const user = result.data;
            
            // បង្ហាញលើ Header (ដូចក្នុងរូបភាព siv punleu)
            if(displayName) displayName.textContent = `${user.firstName} ${user.lastName}`;
            if(displayEmail) displayEmail.textContent = user.email;
            
            // បំពេញក្នុង Form (Kon Khmer)
            if(document.getElementById('firstName')) document.getElementById('firstName').value = user.firstName;
            if(document.getElementById('lastName')) document.getElementById('lastName').value = user.lastName;
            if(document.getElementById('email')) document.getElementById('email').value = user.email;

            // បង្ហាញរូបភាព
            if(user.avatar && avatarImg) avatarImg.src = user.avatar;
        }
    } catch (err) { console.error("Fetch Error:", err); }
}

avatarInput.addEventListener("change", () => {
  //https://blogs2.csm.linkpc.net/api/v1/auth/profile/avatar
  const file = avatarInput.files[0];
  const formData = new FormData();
  formData.append("avatar", file);

  fetch(`${API_BASE_URL}/profile/avatar`, {
    method: "POST",
    headers: headers,
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.ok && data.data) {
      const user = data.data;
      if(user.avatar && avatarImg) avatarImg.src = user.avatar;
    }
  })
  .catch(err => console.error("Fetch Error:", err));
});

// ១. មុខងារ Upload Avatar
avatarInput.addEventListener("change", async () => {
    const file = avatarInput.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
        const res = await fetch(`${API_BASE_URL}/profile/avatar`, {
            method: "POST",
            headers: { 'Authorization': `Bearer ${Token}` }, // កុំដាក់ Content-Type ពេលប្រើ FormData
            body: formData
        });

        const data = await res.json();
        if (res.ok) {
            Swal.fire({ icon: 'success', title: 'ប្តូររូបភាពជោគជ័យ', timer: 1500, showConfirmButton: false });
            fetchProfile(); // ហៅមកវិញដើម្បី Update រូបភាពគ្រប់កន្លែង
        } else {
            Swal.fire('Error', data.message || 'Upload បរាជ័យ', 'error');
        }
    } catch (err) {
        console.error("Upload Error:", err);
    }
});

// ២. មុខងារ Delete Avatar
document.getElementById("btnDelAvatar").onclick = async () => {
    const confirm = await Swal.fire({
        title: 'តើអ្នកប្រាកដទេ?',
        text: "រូបភាព Profile នឹងត្រូវលុប!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'យល់ព្រម',
        cancelButtonText: 'បោះបង់'
    });

    if (confirm.isConfirmed) {
        try {
            const res = await fetch(`${API_BASE_URL}/profile/avatar`, {
                method: "DELETE",
                headers: headers
            });
            if (res.ok) {
                Swal.fire('Deleted!', 'រូបភាពត្រូវបានលុប.', 'success');
                fetchProfile();
            }
        } catch (err) {
            console.error("Delete Error:", err);
        }
    }
};

// ៣. មុខងារ Edit Profile (Save Changes)
document.getElementById("profileForm").onsubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value
    };

    try {
        const res = await fetch(`${API_BASE_URL}/profile`, {
            method: "PUT",
            headers: { ...headers, "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const result = await res.json();
        if (res.ok) {
            await Swal.fire({ icon: 'success', title: 'រក្សាទុកជោគជ័យ', timer: 1500, showConfirmButton: false });
            btnedit(); // បិទ Mode Edit មកវិញ
            fetchProfile(); // Update ឈ្មោះនៅ Topbar និង Card
        } else {
            Swal.fire('Error', result.message || 'មិនអាចកែប្រែបានទេ', 'error');
        }
    } catch (err) {
        console.error("Update Error:", err);
    }
};

// បន្ថែមមុខងារប៊ូតុង Edit និង Cancel ដើម្បីឱ្យ Form ដំណើរការ
window.btnedit = function() {
    const form = document.getElementById("profileForm");
    const inputs = document.querySelectorAll(".formP");
    const saveRow = document.getElementById("saveRow");
    const btnEdit = document.getElementById("btnEdit");

    const isEditing = saveRow.style.display === "none";

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

// ចាប់ផ្ដើមដំណើរការ
window.onload = fetchProfile;