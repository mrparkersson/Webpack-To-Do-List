const Tasks = require('./class');

const tasks = new Tasks();

describe('testing add', () => {
  test('adding the first task', () => {
    tasks.add({ description: 'task 1' });
    expect(tasks.list.length).toBe(1);
  });

  test('adding and chacking task description', () => {
    tasks.add({ description: 'task 2' });
    expect(tasks.list[1].description).toBe('task 2');
  });
});

describe('testing delete', () => {
  const deleteIndex = 1;

  test('test if first element is deleted', () => {
    tasks.remove(deleteIndex);
    expect(tasks.list.length).toBe(1);
  });
});
