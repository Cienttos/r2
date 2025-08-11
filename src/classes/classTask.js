export default class Task {
  constructor(title, description, date_i = null, date_f = null, completed = false) {
    this.title = title;
    this.description = description;
    this.date_i = date_i;
    this.date_f = date_f;
    this.completed = completed;
  }

  updateStartDate(date = new Date()) {
    this.date_i = date.toISOString();
  }

  updateEndDate(date = new Date()) {
    this.date_f = date.toISOString();
  }

  dowload() {
    let tasks = [];
    try {
      const stored = localStorage.getItem("tasks");
      tasks = stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error leyendo tasks de localStorage:", error);
    }

    const taskObj = {
      title: this.title,
      description: this.description,
      date_i: this.date_i,
      date_f: this.date_f,
      completed: this.completed,
    };

    tasks.push(taskObj);

    try {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error guardando tasks en localStorage:", error);
    }
  }
}
