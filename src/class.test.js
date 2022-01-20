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

  test('Adding the third task', () => {
    tasks.add({ description: 'task 3' });
    expect(tasks.list[2].description).toBe('task 3');
  });

  test('Adding several tasks', () => {
    tasks.add({ description: 'task 3' });
    tasks.add({ description: 'task 4' });
    tasks.add({ description: 'task 5' });
    expect(tasks.list.length).toBe(6);
  });
});

describe('testing delete', () => {
  const removeIndex = 1;

  test('test if first element is deleted', () => {
    tasks.remove(removeIndex);
    expect(tasks.list.length).toBe(5);
  });

  test('test if another element is deleted', () => {
    tasks.remove(removeIndex);
    expect(tasks.list.length).toBe(4);
  });

  test('test removing several elements', () => {
    tasks.remove(removeIndex);
    tasks.remove(removeIndex);
    tasks.remove(removeIndex);
    tasks.remove(removeIndex);
    expect(tasks.list.length).toBe(0);
  });
});
