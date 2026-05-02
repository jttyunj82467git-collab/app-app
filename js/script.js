let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function saveTasks() {
    localStorage.setItem("tasks",JSON.stringify(tasks));
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

    tasks.push(newTask);
    saveTasks();
    renderTasks();
}
function renderTasks() {
    const list = document.getElementById("tasklist");
    list.innerHTML = "";

    tasks.forEach(task => {
        const li =document.createElement("li");

        li.innerHTML = `
          ${task.title} (${task.deadline})
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