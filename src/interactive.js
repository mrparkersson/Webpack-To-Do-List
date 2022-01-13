const clearAll = (tasks) => {
  return tasks.filter((task) => !task.completed);
};

const updateCheck = (tasks, index) => {
  let task = tasks.find((t) => t.index === index);
  task.completed = !task.completed;
  return tasks;
};

export { updateCheck, clearAll };
