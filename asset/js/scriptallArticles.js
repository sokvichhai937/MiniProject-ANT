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
                                    <button class="icon-btn1 border-1 border-secondary rounded-1">
                                        <i class="fa-regular fa-pen-to-square text-secondary"></i>
                                    </button>

                                    <button class="icon-btn border-1 border-danger rounded-1"
                                        onclick="openDeleteModal(${ownArt.id})">
                                        <i class="fa-solid fa-trash-can text-danger"></i>
                                    </button>
                                  </td>
                                    </tr>
                                    `

        })
    })
//===========================delete====================================
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
//=============================edit==========================================

