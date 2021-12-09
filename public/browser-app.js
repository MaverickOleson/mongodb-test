const TASKSDOM = document.querySelector(".tasks");
const LOADINGDOM = document.querySelector(".loading-text");
const FORMDOM = document.querySelector(".task-form");
const TASKINPUTDOM = document.querySelector(".task-input");
const FORMALERTDOM = document.querySelector(".form-alert");
//Load tasks from api/tasks
const SHOWTASKS = async () => {
    LOADINGDOM.style.visibility = "visible";
    try {
        const { data: { tasks }, } = await axios.get("/api/v1/tasks")
        if (tasks.length < 1) {
            TASKSDOM.innerHTML = '<h5 class="empty-list">No Tasks in Your List</h5>'
            LOADING.style.visibility = "hidden";
            return;
        }
        const ALLTASKS = tasks.map((task) => {
            const { completed, _id: taskID, name } = task;
            return `<div class="single-task ${completed && "task-completed"}" }><h5><span><i class="far fa-check-circle"></i></span>${name}</h5><div class="task-links>
            <!-- edit link -->
            <a href="task.html?id=${taskID}" class="edit-link">
            <i class="fas fa-edit"></i>
            </a>
            <!-- delete btn -->
            <button type="button" class="delete-btn" data-id="${taskID}">
            <i class="fas fa-trash"></i>
            </button>
            </div>
            </div>`;
        }).join("");
        TASKSDOM.innerHTML = ALLTASKS;
    }
    catch (error) {
        TASKSDOM.innerHTML = `<h5 class="empty-list">There was an error, please try again later...${error}</h5>`
    }
    LOADING.style.visibility = "hidden";
}

SHOWTASKS();

//delete task /api/tasks/:id

TASKSDOM.addEventListener('click', async (e) => {
    const EL = e.target;
    if (EL.parentElement.classList.contains("delete-btn")) {
        LOADINGDOM.style.visibility = "visible";
        const ID = EL.parentElement.dataset.id;
        try {
            await axios.delete(`/api/tasks/${ID}`);
            SHOWTASKS();
        }
        catch (error) {
            console.log(error);
        }
    }
    LOADINGDOM.style.visibility = "hidden";
})

//form
FORMDOM.addEventListener("submit", async (e) => {
    e.preventDefault();
    const NAME = TASKINPUTDOM.nodeValue;

    try {
        await axios.post("/api/v1/tasks", { name })
        SHOWTASKS();
        TASKINPUTDOM.value = ""
        FORMALERTDOM.style.display = "block"
        FORMALERTDOM.textContent = "Success, task added"
        FORMALERTDOM.classList.add("text-success")
    }
    catch (error) {
        FORMALERTDOM.style.display = "block"
        FORMALERTDOM.innerHTML = "Error Please Try Again"
    }
    setTimeout(() => {
        FORMALERTDOM.style.display = 'none'
        FORMALERTDOM.classList.remove("text-success")
    }, 1000);
})