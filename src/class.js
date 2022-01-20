class Tasks {
  constructor(storage) {
    this.list = storage ? JSON.parse(storage) : [];
  }

  add(task) {
    task.index = this.list.length + 1;
    task.completed = false;
    this.list.push(task);
  }

  remove(index) {
    this.list = this.list.filter((task) => task.index !== index);
    this.list = this.list.map((t) => {
      if (t.index > index) {
        t.index -= 1;
      }
      return t;
    });
  }

  edit(task) {
    this.list[task.index - 1] = task;
  }

  sort(oldIndex, newIndex) {
    this.list[oldIndex - 1].index = newIndex;
  }

  clearCompleted() {
    this.list = this.list.sort((a, b) => a.index - b.index);
    this.list = this.list.filter((t) => !t.completed);
    this.list = this.list.map((t, i) => {
      t.index = i + 1;
      return t;
    });
  }
}

module.exports = Tasks;
