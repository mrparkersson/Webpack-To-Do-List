const Tasks = require('./class');

const tasks = new Tasks();

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
