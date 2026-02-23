//Youra
// Get elements 
let GetArticleForm = document.getElementById("articleForm");
let GetTitle = document.getElementById("title");
let GetCategorySelect = document.getElementById("categorySelect");
let GetThumbnail = document.getElementById("thumbnail");
let GetContent = document.getElementById("content");
let Token = localStorage.getItem("token") || sessionStorage.getItem("token"); 

// Error elements
let ErrorTitle = document.getElementById("titleError");
let ErrorCategory = document.getElementById("categoryError");
let ErrorContent = document.getElementById("contentError");

// Clear error text
ErrorTitle.innerText = "";
ErrorCategory.innerText = "";
ErrorContent.innerText = "";

// Title validation
usrTitleInput = () => {
    if(GetTitle.value.trim() === ""){
        GetTitle.classList.add("is-invalid");
        GetTitle.classList.remove("is-valid");

        ErrorTitle.innerText = "Title is required!";
        ErrorTitle.classList.add("text-danger");
    }
    else{
        GetTitle.classList.add("is-valid");
        GetTitle.classList.remove("is-invalid");

        ErrorTitle.innerText = "";
    }
}

// Category validation
selectCategory = () => {
    if(GetCategorySelect.value === "0"){
        GetCategorySelect.classList.add("is-invalid");
        GetCategorySelect.classList.remove("is-valid");

        ErrorCategory.innerText = "Please select category!";
    }
    else{
        GetCategorySelect.classList.add("is-valid");
        GetCategorySelect.classList.remove("is-invalid");

        ErrorCategory.innerText = "";
    }
}

 mainAction =(e)=> {

    e.preventDefault();
    GetArticleForm .innerHTML="";

    usrTitleInput();
    selectCategory();

    if (GetContent.value.trim() === "") {
        GetContent.classList.add("is-invalid");
        ErrorContent.innerText = "Content required!";
    } else {
        GetContent.classList.remove("is-invalid");
        GetContent.classList.add("is-valid");
        ErrorContent.innerText = "";
    }
    StoreArticles();
  
}

backArticles=()=>{

}

CreateArticles=()=>{
   fetch("https://blogs2.csm.linkpc.net/api/v1/categories")
   .then(res => res.json())
   .then(datas => {
      //  console.log(data);
    
      let CateNmae=datas.data.items;
    
        CateNmae.forEach(key => {
           // console.log(category.name);
            let Cate=
                `
                   <option value="${key.id}">
                        ${key.name}
                    </option>
                              
                `;
                GetCategorySelect.innerHTML+=Cate;
        });
   })
}
CreateArticles();
StoreArticles=()=>{
fetch("https://blogs2.csm.linkpc.net/api/v1/articles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${Token} `
        },
        body: JSON.stringify({
            title: GetTitle.value,
            categoryId:Number(GetCategorySelect.value) ,
            content:GetContent.value,
           // thumbnail:GetThumbnail.value
        })
    })
    .then(res => res.json())
    .then(data => {
        CreateArticles();
        console.log(data);
    });
}