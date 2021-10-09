
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

    element.querySelector('button.destory').dataset.index = index
    element.querySelector('input.edit').dataset.index = index
    element.querySelector('input.toggle').dataset.index = index

    // attachEventsTodoElement(element, index, events);

    element
    .addEventListener('dblclick', (e)=>{
      element.classList.add('editing');
      element.querySelector('input.edit').focus();
    })

    return element;
}

const attachEventsTodoElement = (element, index , events) => {

  element
    .querySelector('button.destory')
    .addEventListener('click', e => events.deleteItem(index));

  element
    .addEventListener('dblclick', (e)=>{
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

const eventDelegate = (element, events) =>{
  const {toggleItemCompleted, updateItem ,deleteItem} = events;

  element.addEventListener('click' , (e) =>{
    if (e.target.matches('button.destory')){
      deleteItem(e.target.dataset.index);
    }
    if (e.target.matches('input.toggle')) {
      toggleItemCompleted(e.target.dataset.index)
    }
  })

  element.addEventListener('keypress', (e) => {
    if (e.target.matches('input.edit')){
      if (e.key === 'Enter'){
        updateItem(e.target.dataset.index, e.target.value)
        e.target.classList.remove('editing');
      }
    }
  })
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
    eventDelegate(newTodoList, events)

    return newTodoList;
}