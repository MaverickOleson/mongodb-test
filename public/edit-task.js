const TASKIDDOM = document.querySelector(".task-edit-id")
const TASKNAMEDOM = document.querySelector(".task-edit-name")
const TASKCOMPLETEDOM = document.querySelector(".task-edit-completed")
const EDITFORMDOM = document.querySelector(".single-task-form")
const EDITBTNDOM = document.querySelector(".task-edit-btn")
const FORMALERTDOM = document.querySelector(".form-alert")
const PARAMS = window.location.search
const ID = new URLSearchParams(PARAMS).get('id')
let tempName

const SHOWTASK = async () => {
    try {
        const { data: task, } = await axios.get(`/api/v1/tasks/${ID}`)
        const { _id: taskId, completed, name } = task
        TASKIDDOM.textContent = taskId
        TASKNAMEDOM.value = name
        TASKCOMPLETEDOM.checked = completed;
        tempName = name
        if (completed) {
            TASKCOMPLETEDOM.checked = true
        }
    }
    catch(error) {
        console.log(error)
    }
}
SHOWTASK()

EDITFORMDOM.addEventListener('submit', async (e) => {
    EDITBTNDOM.textContent = 'Loading...'
    e.preventDefault()
    try {
        const TASKNAME = TASKNAMEDOM.value
        const TASKCOMPLETED = TASKCOMPLETEDOM.checked
        await axios.patch(`/api/v1/tasks/${ID}`, { name: TASKNAME, completed: TASKCOMPLETED })
        FORMALERTDOM.style.display = 'block'
        FORMALERTDOM.textContent = 'Success, edited task'
        FORMALERTDOM.classList.add('text-success')
    } catch (error) {
        console.error(error)
        TASKNAMEDOM.value = tempName
        FORMALERTDOM.style.display = 'block'
        FORMALERTDOM.innerHTML = 'Error, please try again'
    }
    EDITBTNDOM.textContent = 'Edit'
    setTimeout(() => {
        FORMALERTDOM.style.display = 'none'
        FORMALERTDOM.classList.remove('text-success')
    }, 3000);
})