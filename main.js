document.getElementById('todo-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the form from submitting  
});

let input =document.querySelector("#input");
let submit=document.querySelector("#add");
let tasksdiv=document.querySelector("#ex1-tabs-1 ul"); 



//add task
submit.onclick=function(){
    if (input.value !=="") {
        savetask(input.value)
        input.value=""; 
    } 
}

 function savetask(addedTask){
    fetch('api/create.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: addedTask })
    })
    .then(response => response.json())
    .then(() => loadTasks());
};


function loadTasks(){
    fetch('api/read.php')
        .then(response => response.json())
        .then(tasks => {
            tasksdiv.innerHTML = "";
            document.querySelector("#completed-tasks").innerHTML = "";

            tasks.forEach((task) =>{ 
                let li = document.createElement("li");
                li.className = "list-group-item d-flex align-items-center border-0 mb-2 rounded";
                li.style.backgroundColor = "#f4f6f7";
                li.setAttribute("data-id", task.id);

                let checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.className = "form-check-input me-2";
                checkbox.checked = task.completed ? true : false;
                checkbox.onclick = () => updateTaskStatus(task.id, checkbox.checked); 

                li.appendChild(checkbox);
                
                      // Add the task title
                 let textNode = document.createTextNode(task.title);
                  li.appendChild(textNode);


    
                // delete btn
                let span = document.createElement("span");
                span.className = "ms-auto text-danger del";
                span.style.cursor = "pointer";
                span.appendChild(document.createTextNode("Delete"));
                span.onclick = () => deleteTask(task.id);
                li.appendChild(span)

                if (task.completed) {
                    document.querySelector("#completed-tasks").appendChild(li);
                } else {
                    document.querySelector("#ex1-tabs-1 ul").appendChild(li);
                }
    
});})}

//function deleteTask
function deleteTask(id) {
    fetch('api/delete.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id })
    })
    .then(response => response.json())
    .then(() => loadTasks());
}
function updateTaskStatus(id, completed) {
    fetch('api/update.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, completed: completed })
    })
    .then(response => response.json())
    .then(() => loadTasks()) 
}


//to load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);