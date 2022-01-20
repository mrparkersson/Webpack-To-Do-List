import 'material-icons/iconfont/material-icons.css';
import './style.css';
import Tasks from './class';
import updateTask from './update';

const clearAll = document.querySelector('.clear');
const form = document.querySelector('form');

const tasks = new Tasks();

updateTask(tasks);

clearAll.addEventListener('click', () => {
  tasks.clearCompleted();
  updateTask(tasks);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  tasks.add({
    description: form.elements.input.value.trim(),
  });

  form.reset();

  updateTask(tasks);
});
