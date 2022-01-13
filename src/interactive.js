const clearAll = (tasks) => tasks.filter((task) => !task.completed);
const updateCheck = (tasks, index) => {
  const task = tasks.find((t) => t.index === index);
  task.completed = !task.completed;
  return tasks;
};

export { updateCheck, clearAll };
