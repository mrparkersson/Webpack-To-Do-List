import 'material-icons/iconfont/material-icons.css';
import './style.css';
import dragDrop from './drag';

const listParent = document.querySelector('.list');
const returnIcon = document.querySelector('.add span');
const textInput = document.querySelector('.add input');

let tasks = localStorage.getItem('todos')
  ? JSON.parse(localStorage.getItem('todos'))
  : [];

function renderHtml() {
  listParent.innerHTML = '';

  tasks
    .sort((a, b) => a.index - b.index)
    .forEach((task) => {
      listParent.innerHTML += `
      <li draggable=true>
        <div class="content">
          <input class="check" type="checkbox" ${
  task.completed ? 'checked' : ''
}/>
          <input class="input" type="text" value='${
  task.description
}' readonly />
        </div>
        <div class="actions">
          <span class="material-icons drag">more_vert</span>
          <span class="material-icons hide" id="delete">delete_outline</span>
        </div>
      </li>
      `;
    });
}

renderHtml();

// adding and removing

returnIcon.addEventListener('click', () => {
  if (textInput.value.length === 0) {
    alert('Please Enter a To Do');
  } else {
    tasks.push({
      description: textInput.value,
      completed: false,
      index: tasks.length,
    });

    textInput.value = '';

    localStorage.setItem('todos', JSON.stringify(tasks));

    const updateTasks = () => {
      listParent.innerHTML = '';
      tasks.forEach((task) => {
        listParent.innerHTML += `
     <li draggable ="true" id="${task.index}">
       <div class="content">
         <input class="check" type="checkbox" ${
  task.completed ? 'checked' : ''
}/>
         <input class="input" type="text" value='${
  task.description
}' readonly />
       </div>
       <div class="actions">
         <span class="material-icons drag">more_vert</span>
         <span class="material-icons" id="deleteicon">delete_outline</span>
       </div>
     </li>
     `;
      });
      const deletButton = document.querySelectorAll('#deleteicon');

      deletButton.forEach((x) => {
        x.addEventListener('click', () => {
          const id = Number(x.parentNode.parentNode.id);
          tasks = tasks.filter((task) => task.index !== id);
          updateTasks();
          localStorage.setItem('todos', JSON.stringify(tasks));
        });
      });
      dragDrop(tasks)
    };
    updateTasks();
  }
});

// dragging an item


