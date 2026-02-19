let token =`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMjQsImlhdCI6MTc3MTIyNzMxNCwiZXhwIjoxNzcxODMyMTE0fQ.zpXRLRUQZT6W8mzg7SUzcAvx2W0uBZy87zfxVa8uxhg`;
        fetch(`https://blogs2.csm.linkpc.net/api/v1/articles/own`,{
        headers:{
            'Authorization':`${token}`
              }
        
        })
        .then(res => res.json())
        .then(dataArticle=>
        {
            console.log(dataArticle.data.items);
            let ownArticles = dataArticle.data.items;
            let tableBody = document.getElementById("tableBody");
            ownArticles.forEach(ownArt=>{
                console.log(ownArt);
                tableBody.innerHTML += `<tr>
                    <th>${ownArt.id}</th>
                    <th>${ownArt.title}</th>
                   <th><img src="${ownArt.thumbnail}" alt=""></th>
                    <th>Content</th>
                </tr>`

            })
        })