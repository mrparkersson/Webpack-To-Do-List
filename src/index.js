import 'material-icons/iconfont/material-icons.css';
import './style.css';
import Tasks from './class';

const listParent = document.querySelector('.list');
const clearAll = document.querySelector('.clear');
const form = document.querySelector('form');

const tasks = new Tasks(localStorage.getItem('tasks'));

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks.list));
};

const updateTask = () => {
  listParent.innerHTML = '';

  tasks.list
    .sort((a, b) => a.index - b.index)
    .forEach((t) => {
      listParent.innerHTML += `
      <li id="task-${t.index}" draggable="true">
        <div class="content">
          <input class="check" type="checkbox" ${t.completed ? 'checked' : ''}/>
          <input class="input" type="text" value='${t.description}' readonly />
        </div>
        <div class="actions">
          <span class="material-icons drag">more_vert</span>
          <span class="material-icons dele">delete_outline</span>
        </div>
      </li>
      `;
    });

  const lis = document.querySelectorAll('li');
  lis.forEach((li) => {
    li.addEventListener('click', (e) => {
      const elm = e.target;
      if (elm.classList.contains('drag') || elm.classList.contains('check')) {
        return;
      }

      lis.forEach((elm) => elm.classList.remove('active'));
      li.classList.add('active');

      const inp = li.querySelector('.input');
      inp.readOnly = false;
      inp.focus();
      inp.setSelectionRange(inp.value.length, inp.value.length);
    });
  });

  document.querySelectorAll('li .input').forEach((inp) => {
    inp.addEventListener('focusout', () => {
      setTimeout(() => {
        inp.parentNode.parentNode.classList.remove('active');

        inp.readOnly = true;
      }, 200);
    });
    inp.addEventListener('input', () => {
      const id = Number(inp.parentNode.parentNode.id.split('-')[1]);

      const obj = tasks.list.find((t) => t.index === id);

      obj.description = inp.value.trim();

      tasks.edit(obj);
      saveTasks();
    });
  });

  document.querySelectorAll('li .check').forEach((inp) => {
    inp.addEventListener('change', () => {
      const id = Number(inp.parentNode.parentNode.id.split('-')[1]);

      const obj = tasks.list.find((t) => t.index === id);

      obj.completed = inp.checked;

      tasks.edit(obj);
      saveTasks();
    });
  });

  document.querySelectorAll('.dele').forEach((delBtn) => {
    delBtn.addEventListener('click', () => {
      const id = Number(delBtn.parentNode.parentNode.id.split('-')[1]);

      tasks.remove(id);
      saveTasks();
      delBtn.parentNode.parentNode.remove();
    });
  });
};

updateTask();

clearAll.addEventListener('click', () => {
  tasks.clearCompleted();
  saveTasks();
  updateTask();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  tasks.add({
    description: form.elements.input.value.trim(),
  });
  saveTasks();

  form.reset();

  updateTask();
});
