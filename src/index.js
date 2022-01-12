import 'material-icons/iconfont/material-icons.css';
import './style.css';

const listParent = document.querySelector('.list');

const tasks = [
  {
    index: 0,
    description: 'wash the dishes',
    completed: true,
  },
  {
    index: 1,
    description: 'Complete To Do list Project',
    completed: false,
  },
  {
    index: 2,
    description: 'Build another template',
    completed: false,
  },
];

function render() {
  listParent.innerHTML = '';

  tasks
    .sort((a, b) => a.index - b.index)
    .forEach((t) => {
      listParent.innerHTML += `
      <li>
        <div class="content">
          <input class="check" type="checkbox" ${t.completed ? 'checked' : ''}/>
          <input class="input" type="text" value='${t.description}' readonly />
        </div>
        <div class="actions">
          <span class="material-icons drag">more_vert</span>
          <span class="material-icons hide">delete_outline</span>
        </div>
      </li>
      `;
    });
}

render();
