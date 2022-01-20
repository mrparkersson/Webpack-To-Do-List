const Tasks = require('./class');

const tasks = new Tasks();

describe('testing add', () => {
  test('adding the first task', () => {
    tasks.add({ description: 'task 1' });
    expect(tasks.list.length).toBe(2);
  });

  test('adding and checking task description', () => {
    tasks.add({ description: 'task 2' });
    expect(tasks.list[1].description).toBe('task 2');
  });
});

describe('testing delete', () => {
  const removeIndex = 1;

  test('test if first element is deleted', () => {
    tasks.remove(removeIndex);
    expect(tasks.list.length).toBe(1);
  });
});
