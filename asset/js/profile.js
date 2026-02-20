//JS (edit mode + avatar preview) 

  const btnEdit = document.getElementById("btnEdit");
  const btnCancel = document.getElementById("btnCancel");
  const saveRow = document.getElementById("saveRow");
  const form = document.getElementById("profileForm");

  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");

  const displayName = document.getElementById("displayName");
  const displayEmail = document.getElementById("displayEmail");

  const avatarInput = document.getElementById("avatarInput");
  const avatarImg = document.getElementById("avatarImg");
  const delBtn = document.querySelector(".pro-del");

  let backup = {
    first: firstName.value,
    last: lastName.value,
    email: email.value
  };

  function setEditMode(on){
    [firstName, lastName, email].forEach(el => {
      el.disabled = !on;
      el.classList.toggle("is-edit", on);
    });
    saveRow.style.display = on ? "flex" : "none";
    btnEdit.innerHTML = on
      ? '<i class="bi bi-pencil-square me-2"></i> Editing...'
      : '<i class="bi bi-pencil-square me-2"></i> Edit Profile';
    btnEdit.disabled = on;
    if(on) firstName.focus();
  }

  btnEdit.addEventListener("click", () => {
    backup = { first: firstName.value, last: lastName.value, email: email.value };
    setEditMode(true);
  });

  btnCancel.addEventListener("click", () => {
    firstName.value = backup.first;
    lastName.value = backup.last;
    email.value = backup.email;
    setEditMode(false);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // update header display
    displayName.textContent = (firstName.value + " " + lastName.value).trim();
    displayEmail.textContent = email.value.trim();

    setEditMode(false);

    // ✅ Replace with API update request
    alert("Profile updated ✅ (send to API here)");
  });

  // avatar preview
  avatarInput.addEventListener("change", () => {
    const file = avatarInput.files && avatarInput.files[0];
    if(!file) return;
    const url = URL.createObjectURL(file);
    avatarImg.src = url;

    // ✅ Replace with upload API
    // auto-save behavior
  });

  // remove avatar (demo)
  delBtn.addEventListener("click", () => {
    avatarImg.src = "https://i.pravatar.cc/200?img=12";

    // ✅ Replace with delete avatar API
  });