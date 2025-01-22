const inputbox = document.getElementById("text-1");
const searchBar = document.getElementById("search-bar");
const statusFilter = document.getElementById("status-filter");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputbox.value === '') {
        alert("The input box cannot be empty");
    } else {
        let li = document.createElement("li");
        li.innerHTML = `<span class="task-text">${inputbox.value}</span>`;
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
            text: li.querySelector(".task-text").textContent,
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
            li.innerHTML = `<span class="task-text">${task.text}</span>`;
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

function searchTasks() {
    const searchValue = searchBar.value.toLowerCase();
    const filterStatus = statusFilter.value;
    const tasks = listContainer.querySelectorAll("li")
    if (searchValue.trim() === "") {
        tasks.forEach(task => {
            task.style.display = "flex";
        });
        return;
    }

    tasks.forEach(task => {
        const taskText = task.querySelector(".task-text").textContent.toLowerCase();
        const isChecked = task.classList.contains("completed");    
        const matchesSearch = taskText.includes(searchValue);
        const matchesStatus =
            filterStatus === "" || 
            (filterStatus === "checked" && isChecked) || 
            (filterStatus === "unchecked" && !isChecked);
        if (matchesSearch && matchesStatus) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
}


searchBar.addEventListener("input", searchTasks);
statusFilter.addEventListener("change", searchTasks);
