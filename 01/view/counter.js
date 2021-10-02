const getTodoCount = todos =>{
    const notCompleted = todos.filter(todo => !todo.completed)

    const {length} = notCompleted;
    if (length == 1){
        return ' 1 item left'
    }
    else {
        return `${length} item left`
    }
}



export default (targetElement ,{todos}) =>{
    const newCounter = targetElement.cloneNode(true);
    newCounter.textContent = getTodoCount(todos);
    return newCounter;
}