const Tasks = require('./class');
const updateTask = require('./update');

const tasks = new Tasks();
document.body.innerHTML = `<main>
<div class="head">
  <h2>Today's To Do</h2>
  <span class="material-icons">autorenew</span>
</div>
<div class="table">
  <form class="add">
    <input
      class="input"
      id="input"
      type="text"
      placeholder="Add to your list"
      required
    />
    <button type="submit" id="add">
      <span class="material-icons">keyboard_return</span>
    </button>
  </form>
  <ul class="list"></ul>
</div>
<div class="clear">Clear all completed</div>
</main>`;

describe('testing add', () => {
  test('adding the first task', () => {
    tasks.add({ description: 'task 1' });
    expect(tasks.list.length).toBe(1);
  });

  test('adding and checking task description', () => {
    tasks.add({ description: 'task 2' });
    expect(tasks.list[1].description).toBe('task 2');
  });
});

describe('testing delete', () => {
  test('test if first element is deleted', () => {
    tasks.remove(1);
    expect(tasks.list.length).toBe(1);
  });
});

describe('testing edit', () => {
  const tasks = new Tasks();
  tasks.add({ description: 'task 1' });
  const currentTask = tasks.list[0];
  currentTask.description = 'new description';
  test('task 1 description should be new description', () => {
    tasks.edit(currentTask);
    expect(tasks.list[0].description).toBe('new description');
  });
});

describe('testing update complete', () => {
  const tasks = new Tasks();
  const currentTask = tasks.list[0];
  currentTask.completed = true;
  test('task 1 should be completed', () => {
    tasks.edit(currentTask);
    expect(tasks.list[0].completed).toBeTruthy();
  });
});

describe('testing clearing completed', () => {
  const tasks = new Tasks();
  const currentTask = tasks.list[0];
  currentTask.completed = true;
  tasks.edit(currentTask);
  test('The list should be empty after clearing', () => {
    tasks.clearCompleted();
    expect(tasks.list.length).toBe(0);
  });
});

describe('testing dom manipulation functions', () => {
  localStorage.clear();
  const tasks = new Tasks();
  test('An li element should appear when adding', () => {
    tasks.add({ description: 'A task was added' });
    updateTask(tasks);
    expect(document.querySelectorAll('li').length).toBe(1);
  });
  test('Complete should be true after we click checkbox', () => {
    document.querySelector('.check').click();
    expect(tasks.list[0].completed).toBeTruthy();
  });
  test('Deleting an item should delete in the dom', () => {
    document.querySelector('.dele').click();
    expect(tasks.list.length).toBe(0);
  });
});
