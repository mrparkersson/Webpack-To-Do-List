const addTask = () => {
  tasks.push({
    description: textInput.value,
    completed: false,
    index: tasks.length,
  });

  localStorage.setItem('todos', JSON.stringify(tasks));
};
