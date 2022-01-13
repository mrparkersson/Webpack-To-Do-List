import { updateCheck, clearAll } from './interactive';

const listParent = document.querySelector('.list');
const returnIcon = document.querySelector('.add span');
const textInput = document.querySelector('.add input');
const clearButton = document.querySelector('.clear');

let tasks = localStorage.getItem('todos')
  ? JSON.parse(localStorage.getItem('todos'))
  : [];

const updateTasks = () => {
  listParent.innerHTML = '';
  tasks.forEach((task) => {
    listParent.innerHTML += `
   <li draggable ="true" id="${task.index}">
     <div class="content">
       <input class="check" type="checkbox" ${task.completed ? 'checked' : ''}/>
       <input class="input" type="text" value='${task.description}' readonly />
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
  // editing the tasks
  document.querySelectorAll('.input').forEach((inp) => {
    inp.addEventListener('click', () => {
      inp.readOnly = false;
      inp.focus();
    });
    inp.addEventListener('input', () => {
      const id = Number(inp.parentNode.parentNode.id);
      const currentTask = tasks.find((task) => task.index === id);
      currentTask.description = inp.value.trim();
      localStorage.setItem('todos', JSON.stringify(tasks));
    });
  });

  document.querySelectorAll('.check').forEach((check) => {
    check.addEventListener('change', () => {
      const id = Number(check.parentNode.parentNode.id);
      tasks = updateCheck(tasks, id);
      localStorage.setItem('todos', JSON.stringify(tasks));
    });
  });
};

updateTasks();

returnIcon.addEventListener('click', () => {
  if (textInput.value.length === 0) {
    alert('Please Enter a To Do');
  } else {
    tasks.push({
      description: textInput.value,
      completed: false,
      index: tasks.length,
    });

    localStorage.setItem('todos', JSON.stringify(tasks));

    updateTasks();

    textInput.value = '';
  }
});

clearButton.addEventListener('click', () => {
  tasks = clearAll(tasks);
  updateTasks();
  localStorage.setItem('todos', JSON.stringify(tasks));
});
