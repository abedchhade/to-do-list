const inputbox = document.getElementById("text-1");
const listContainer = document.getElementById("list-container");
function addTask() {
    if (inputbox.value === '') {
        alert("The input box cannot be empty");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = '<i class="fa-solid fa-trash"></i>';
        span.classList.add("delete-icon");
        li.appendChild(span);
        span.addEventListener("click", function () {
            li.remove();
            saveTasks();
        });
        let check = document.createElement("span");
        check.innerHTML = '<i class="fa-regular fa-circle"></i>';
        check.classList.add("check-icon");
        li.appendChild(check);
        check.addEventListener("click", function () {
            const icon = check.querySelector("i");
            if (icon.classList.contains("fa-circle")) {
                icon.classList.remove("fa-circle");
                icon.classList.add("fa-circle-check");
                li.classList.add("completed");
            } else {
                icon.classList.remove("fa-circle-check");
                icon.classList.add("fa-circle");
                li.classList.remove("completed");
            }
            saveTasks();
        });
        saveTasks();
    }
    inputbox.value = "";
}
function saveTasks() {
    const tasks = [];
    listContainer.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function displaySavedTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
        savedTasks.forEach(task => {
            let li = document.createElement("li");
            li.innerHTML = task.text;
            if (task.completed) {
                li.classList.add("completed");
            }
            let span = document.createElement("span");
            span.innerHTML = '<i class="fa-solid fa-trash"></i>';
            span.classList.add("delete-icon");
            li.appendChild(span);
            span.addEventListener("click", function () {
                li.remove();
                saveTasks();
            });
            let check = document.createElement("span");
            check.innerHTML = `<i class="fa-regular ${task.completed ? 'fa-circle-check' : 'fa-circle'}"></i>`;
            check.classList.add("check-icon");
            li.appendChild(check);
            check.addEventListener("click", function () {
                const icon = check.querySelector("i");
                if (icon.classList.contains("fa-circle")) {
                    icon.classList.remove("fa-circle");
                    icon.classList.add("fa-circle-check");
                    li.classList.add("completed");
                } else {
                    icon.classList.remove("fa-circle-check");
                    icon.classList.add("fa-circle");
                    li.classList.remove("completed");
                }
                saveTasks();
            });
            listContainer.appendChild(li);
        });
    }
}
displaySavedTasks();

function clearAll() {
    listContainer.innerHTML = "";
    localStorage.removeItem("tasks");
}

