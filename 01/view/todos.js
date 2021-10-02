const getTodoElement = todo =>{
    const {text, completed} = todo;

    return `
    <li ${completed ? 'class="completed"' : ''}>
        <div class="view">
            <input 
                ${completed ? 'checked' : ''}
                class = "toggle"
                type="checkbox" >
        <label>${text}</label>
        </div>
        <input class="edit" value=${text} >
    /li>    
    `
}

export default (targetElement ,{todos}) => {
    const newTodoList = targetElement.cloneNode(true);

    const todoElements = todos.map((todo)=> getTodoElement(todo)).join('');

    newTodoList.innerHTML = todoElements;

    return newTodoList;
}