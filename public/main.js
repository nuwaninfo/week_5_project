const submitButton = document.getElementById("submit-data")
const showMessageSpan = document.getElementById("showMessage")
const searchInput = document.getElementById("searchInput")
const searchButton = document.getElementById("search")
const showTodosDiv = document.getElementById("showTodos")
const showTodosDelMsg = document.getElementById("showTodosDelMsg")

// Add todo
submitButton.addEventListener("click", async function() {
   
    const name = document.getElementById("userInput").value
    const todo = document.getElementById("todoInput").value

    const userFormData = {
        name: name,
        todo: todo
    };

    const userData = await fetch("http://localhost:3000/add", {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(userFormData)
    })
    const userDataJson = await userData.json()
  
    showMessageSpan.innerHTML = '';
    let newP = document.createElement("p")
    newP.id = 'showMesgP';
    newP.textContent = userDataJson.message;
    showMessageSpan.appendChild(newP)
})

// Search event handler
searchButton.addEventListener("click", async function() {
    showTodosDiv.innerHTML = ''
    showTodosDelMsg.innerHTML = ''

    if (document.getElementById("deleteUser")) {
        document.getElementById("deleteUser").remove();
    }

    const name = searchInput.value.trim();

    const response = await fetch(`http://localhost:3000/todos/${name}`)
    const todosJson = await response.json()

    const ul = document.createElement("ul");
    ul.id="todoList"

    if (todosJson.data && todosJson.data.todos) {
    todosJson.data.todos.forEach(todo => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.textContent = todo;
        a.href = "#";
        a.className = "delete-task";

        li.appendChild(a); 
        ul.appendChild(li);  
        
        
       
    })
    showTodosDiv.appendChild(ul);

    const deleteA = document.getElementsByClassName("delete-task");

    // create the delete button
    const deleteUserButton = document.createElement("button");
    deleteUserButton.id = 'deleteUser'
    deleteUserButton.setAttribute("type", "button");
    deleteUserButton.textContent = "Delete User";
    searchButton.insertAdjacentElement("afterend", deleteUserButton);

    // delte user
    deleteUserButton.addEventListener("click", async () => {
        try {
          // Make DELETE request to the server
          const deleteResponse = await fetch("http://localhost:3000/delete", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
          });
    
          const deleteData = await deleteResponse.json();
    
          showTodosDiv.innerHTML = deleteData.message;
          deleteUserButton.remove()
        } catch (err) {
          
          showTodosDiv.innerHTML = "An error occurred while deleting the user.";
        }
      })


       // delete a todo of a user
        const todoA = document.querySelectorAll(".delete-task");

       
        todoA.forEach(link => {
        link.addEventListener("click", async function(event) {
            event.preventDefault(); 

            let todo = this.textContent

            const deleteResponse = await fetch("http://localhost:3000/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, todo }),
              });

            const deleteTodoMsg = await deleteResponse.json(); 
            this.parentElement.remove()
            showTodosDelMsg.innerHTML = deleteTodoMsg.message;
           
         });
        });

    } else {
        showTodosDiv.innerText = todosJson.message
    }
}) // End search event handler



