let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function saveTasks() {
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function addTask() {
    const title = document.getElementById("title").value;
    const deadline = document.getElementById("deadline").value;
    const subject = document.getElementById("subject").value;

    const newTasks = {
        id: Date.now(),
        title,
        deadline,
        subject,
        completed: false
    };

    tasks.push(newTasks);
    saveTasks();
    renderTasks();
}
function renderTasks() {
    const list = document.getElementById("tasklist");
    list.innerHTML = "";

    tasks.sort((a, b) => a.completed - b.completed);

    const today = new Date();

    const completedCount = tasks.filter(t => t.completed).length;
    document.getElementById("status").textContent =
      `${completedCount} / ${tasks.length} 完了`;
    
    tasks.forEach(task => {
        const li =document.createElement("li");

        const deadlineDate = new Date(task.deadline);
        const isOverdue = deadlineDate < today && !task.completed;

        li.innerHTML = `
          <input type="checkbox"
            ${task.completed ? "checked" : ""}
            onchange="toggleComplete(${task.id})"
          >
          <span style="${isOverdue ? 'color:red;':''}">
            ${task.title} (${task.deadline})
          </span>
          <span style="${task.completed ? 'text-decoration: line-through; color:gray;' : ''}">
          ${task.title} (${task.deadline})
          </span>
          
          <button onclick="deleteTask(${task.id})">削除</button>
        `;
        list.appendChild(li);
    });
}
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}
renderTasks();
function toggleComplete(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveTasks();
    renderTasks();
}
