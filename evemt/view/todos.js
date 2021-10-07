
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

    attachEventsTodoElement(element, index, events);

    return element;
}

const attachEventsTodoElement = (element, index , events) => {

  element
    .querySelector('button.destory')
    .addEventListener('click', e => events.deleteItem(index));

  element
    .addEventListener('dbclick', (e)=>{
      element.classList.add('editing');
      element.querySelector('input.edit').focus();
    })

  element
    .querySelector('input.edit')
    .addEventListener('keypress', (e) => {
    if (e.key === 'Enter'){
        events.updateItem(index ,e.target.value);
        element.classList.remove('editing');
    }
  })
 element
    .querySelector('input.toggle')
    .addEventListener('click', e => events.toggleItemCompleted(index))
}

const filterTodos = (todos, filter) => {
  const isCompleted = todo => todo.completed;
  if (filter === 'Active'){
    return todos.filter(todo => !isCompleted(todo))
  }

  if (filter === 'Completed') {
    return todos.filter(isCompleted)
  }

    return [...todos]
  }



export default (targetElement ,{todos, currentFilter},events ) => {

    const newTodoList = targetElement.cloneNode(true);

    const filteredTodos = filterTodos(todos, currentFilter);

    newTodoList.innerHTML = ''

    filteredTodos
    .map((todo ,index) => getTodoElement(todo, index ,events))
    .forEach(element => {
        newTodoList.appendChild(element);
    });

    return newTodoList;
}