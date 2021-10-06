
let template;

const createNewTodoNode = () =>{
  if (!template) {
    template = document.querySelector('#todo-item');
  }

  return template.content.firstElementChild.cloneNode(true);
}
const getTodoElement = (todo, index, events)=>{
    const {text, completed} = todo;
    
    const element = createNewTodoNode();

    element.querySelector('label').textContent = text;
    element.querySelector('input.edit').value = text;

    if (completed) {
      element.classList.add('completed');
      element.querySelector('input.toggle').checked = true;
    }

    const eventHandler = (e) => events.deleteItem(index);

    element
    .querySelector('button.destory')
    .addEventListener('click', eventHandler);

    return element;
}



export default (targetElement ,{todos},events ) => {
    const newTodoList = targetElement.cloneNode(true);

    newTodoList.innerHTML = ''

    todos.map((todo ,index) => getTodoElement(todo, index ,events))
    .forEach(element => {
        newTodoList.appendChild(element);
    });

    return newTodoList;
}