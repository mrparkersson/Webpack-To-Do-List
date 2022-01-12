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
    description: 'Complete To Do project',
    completed: false,
  },
  {
    index: 2,
    description: 'Fix my car',
    completed: false,
  },
];

function renderHtml() {
  listParent.innerHTML = '';

  tasks
    .sort((a, b) => a.index - b.index)
    .forEach((task) => {
      listParent.innerHTML += `
      <li>
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
          <span class="material-icons hide">delete_outline</span>
        </div>
      </li>
      `;
    });
}

renderHtml();
