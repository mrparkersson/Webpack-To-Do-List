const updateTask = (tasks) => {
  const listParent = document.querySelector('.list');
  listParent.innerHTML = '';

  tasks.list
    .sort((a, b) => a.index - b.index)
    .forEach((t) => {
      listParent.innerHTML += `
        <li id="task-${t.index}" draggable="true">
          <div class="content">
            <input class="check" type="checkbox" ${
              t.completed ? 'checked' : ''
            }/>
            <input class="input" type="text" value='${
              t.description
            }' readonly />
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
    });
  });

  document.querySelectorAll('li .check').forEach((inp) => {
    inp.addEventListener('change', () => {
      const id = Number(inp.parentNode.parentNode.id.split('-')[1]);

      const obj = tasks.list.find((t) => t.index === id);

      obj.completed = inp.checked;

      tasks.edit(obj);
    });
  });

  document.querySelectorAll('.dele').forEach((delBtn) => {
    delBtn.addEventListener('click', () => {
      const id = Number(delBtn.parentNode.parentNode.id.split('-')[1]);

      tasks.remove(id);

      delBtn.parentNode.parentNode.remove();
    });
  });
};

module.exports = updateTask;
