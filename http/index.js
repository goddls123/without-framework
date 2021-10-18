import todos from "./todos.js";

const NEW_TODO_TEXT = "A simpel todo Element";
//dom 생성
const printResult = (action, result) => {
    const time = new Date().toDateString;
    const node = document.createElement("p");

    node.textContent = `${action.toUpperCase()} : ${JSON.stringify(
        result
    )}  (${time})`;

    document.querySelector("div").appendChild(node);
};
//event

const onListClick = async () => {
    const data = await todos.list();
    printResult("get", data);
};

const onUpdateClick = async () => {
    const list = await todos.list();
    const { id } = list[0];
    const newTodo = { id, completed: true };
    const data = await todos.update(newTodo);

    printResult("update", data);
};

const onAddClick = async () => {
    const todo = await todos.create(NEW_TODO_TEXT);

    printResult("add", todo);
};

const onDeleteClick = async () => {
    const list = await todos.list();
    const { id } = list[0];
    const data = await todos.deleteTodo(id);

    printResult("delete", data);
};

document
    .querySelector("button[data-list]")
    .addEventListener("click", onListClick);
document
    .querySelector("button[sdata-add]")
    .addEventListener("click", onAddClick);
document
    .querySelector("button[data-delete]")
    .addEventListener("click", onDeleteClick);
document
    .querySelector("button[data-update]")
    .addEventListener("click", onUpdateClick);

//보여주기
