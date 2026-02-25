let token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyNjQsImlhdCI6MTc3MTQ5Mjg1NCwiZXhwIjoxNzcyMDk3NjU0fQ.dK69T0wKxb2RABjmqWW7JiEr_uXSfe-2W7qXgOkXOrI`;
fetch(`https://blogs2.csm.linkpc.net/api/v1/articles/own?search=&_page=1&_per_page=100&sortBy=createdAt&sortDir=asc`, {
    headers: {
        'Authorization': `${token}`
    }

})
    .then(res => res.json())
    .then(dataArticle => {
        let allArticles = dataArticle.data.items;
        let tableBody = document.getElementById("tbody");
        allArticles.forEach(ownArt => {
            tableBody.innerHTML += `<tr>
                                    <td>${ownArt.title}</td>
                                    <td>${ownArt.category}</td>
                                    <td>${ownArt.content}</td>
                                    <td><img src="${ownArt.thumbnail}" alt="" width="100" hight="100" class="rounded-3"></td>
                                    <td>
                                    <button class="icon-btn1 border-1 border-secondary rounded-1" 
                                        onclick="openEditModal(${ownArt.id})">
                                        <i class="fa-regular fa-pen-to-square text-secondary"></i>
                                    </button>
                                    <button class="icon-btn border border-1 border-danger rounded-1"
                                        onclick="openDeleteModal(${ownArt.id})">
                                        <i class="fa-solid fa-trash-can text-danger fs-6"></i>
                                    </button>
                                  </td>
                                    </tr>
                                    `

        })
    })    

//==============================delete====================================

let articleIdToDelete = null;

function openDeleteModal(id) {
    articleIdToDelete = id;
    document.getElementById("deleteConfirmModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("deleteConfirmModal").style.display = "none";
}

function confirmDelete() {
    if (!articleIdToDelete) return;

    fetch(`https://blogs2.csm.linkpc.net/api/v1/articles/${articleIdToDelete}`, {
        method: 'DELETE',
        headers: { 'Authorization': token }
    })
        .then(res => {
            if (res.ok) {
                location.reload();
            } else {
                alert("Failed to delete article");
            }
        })
        .catch(err => alert(err.message));

    closeModal();
}
//=================================edit==========================================
let articleIdToedit = null;
function confirmEdit()
{
    fetch(`https://blogs2.csm.linkpc.net/api/v1/articles/${articleIdToedit}`, {
        method: 'EDIT',
        headers: { 'Authorization': token }
    })
        .then(res => {
            if (res.ok) {
                location.reload();
            }
        })
        .catch(err => alert(err.message));

    closeModal();
}

function openEditModal(id) {
    articleIdToedit = id;
}


saveEdit = (id) =>{
    fetch(`https:blogs2.csm.linkpc.net/api/v1/categories${articleIdToedit}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: GetTitle.value,
            description: GetDescription.value,
            published: GetPublished.checked ? 1 : 0
        })
    })
    .then(res => res.json())
    .then(data => {
        isEdit = null;
        titleForm.innerHTML = "Create New Item";
        btnSave.innerHTML = "Submit";
        myForm.reset();
        displayBook();
        console.log(data);
    })
}


