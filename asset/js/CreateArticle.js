// Get elements (NOT value)
let GetTitle = document.getElementById("title");
let GetCategorySelect = document.getElementById("categorySelect");
let GetThumbnail = document.getElementById("thumbnail");
let GetContent = document.getElementById("content");

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

  
}
backArticles=()=>{

}

CreateArticles=()=>{
    
}
