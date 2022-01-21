class Tasks {
  constructor() {
    this.list = localStorage.getItem('tasks')
      ? JSON.parse(localStorage.getItem('tasks'))
      : [];
  }

  add(task) {
    task.index = this.list.length + 1;
    task.completed = false;
    this.list.push(task);
    localStorage.setItem('tasks', JSON.stringify(this.list));
  }

  remove(index) {
    this.list = this.list.filter((task) => task.index !== index);
    this.list = this.list.map((t) => {
      if (t.index > index) {
        t.index -= 1;
      }
      return t;
    });
    localStorage.setItem('tasks', JSON.stringify(this.list));
  }

  edit(task) {
    this.list[task.index - 1] = task;
    localStorage.setItem('tasks', JSON.stringify(this.list));
  }

  sort(oldIndex, newIndex) {
    this.list[oldIndex - 1].index = newIndex;
    localStorage.setItem('tasks', JSON.stringify(this.list));
  }

  clearCompleted() {
    this.list = this.list.sort((a, b) => a.index - b.index);
    this.list = this.list.filter((t) => !t.completed);
    this.list = this.list.map((t, i) => {
      t.index = i + 1;
      return t;
    });
    localStorage.setItem('tasks', JSON.stringify(this.list));
  }
}

module.exports = Tasks;
