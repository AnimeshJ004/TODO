const API_BASE = '/todos';

let btn = document.querySelector("button");
let ul = document.querySelector("ul");
let inp = document.querySelector("input");

// Load todos on page load
document.addEventListener('DOMContentLoaded', loadTodos);

async function loadTodos() {
  try {
    const response = await fetch(API_BASE);
    const todos = await response.json();
    todos.forEach(todo => addTodoToDOM(todo));
  } catch (error) {
    console.error('Error loading todos:', error);
  }
}

btn.addEventListener("click", async function(){
  const text = inp.value.trim();
  if (!text) return;

  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const newTodo = await response.json();
    addTodoToDOM(newTodo);
    inp.value = "";
  } catch (error) {
    console.error('Error adding todo:', error);
  }
});

ul.addEventListener("click", async function(event){
  if(event.target.nodeName=="BUTTON" && event.target.classList.contains("delete")){
    const listitem = event.target.parentElement;
    const todoId = listitem.dataset.id;

    try {
      await fetch(`${API_BASE}/${todoId}`, {
        method: 'DELETE',
      });
      listitem.remove();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }
});

function addTodoToDOM(todo) {
  let item = document.createElement("li");
  item.innerText = todo.text;
  item.dataset.id = todo._id;

  let dltbtn = document.createElement("button");
  dltbtn.innerText = "delete";
  dltbtn.classList.add("delete");

  item.appendChild(dltbtn);
  ul.appendChild(item);
}
