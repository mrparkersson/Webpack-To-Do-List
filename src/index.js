import 'material-icons/iconfont/material-icons.css';
import './style.css';

const listParent = document.querySelector('.list');

const tasks = [
  {
    index: 0,
    description: 'test 1',
    completed: true,
  },
  {
    index: 1,
    description: 'test 2',
    completed: false,
  },
  {
    index: 2,
    description: 'test 3',
    completed: false,
  },
];

function render() {
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

render();
