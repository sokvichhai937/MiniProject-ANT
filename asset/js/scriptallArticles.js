let token =`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyNjQsImlhdCI6MTc3MTQ5Mjg1NCwiZXhwIjoxNzcyMDk3NjU0fQ.dK69T0wKxb2RABjmqWW7JiEr_uXSfe-2W7qXgOkXOrI`;
        fetch(`https://blogs2.csm.linkpc.net/api/v1/articles/own?search=&_page=1&_per_page=100&sortBy=createdAt&sortDir=asc`,{
        headers:{
            'Authorization':`${token}`
              }
        
        })
        .then(res => res.json())
        .then(dataArticle=>
        {
            console.log(dataArticle.data.items);
            let allArticles = dataArticle.data.items;
            let tableBody = document.getElementById("tbody");
            allArticles.forEach(ownArt=>{
                console.log(ownArt)
                tableBody.innerHTML += `<tr>
                                <td>${ownArt.title}</td>
                                <td>${ownArt.category}</td>
                                <td>${ownArt.content}</td>
                                <th><img src="${ownArt.thumbnail}" alt=""></th>
                            </tr> `

            })
        })