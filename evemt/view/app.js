
let template;

const createNewAppNode = () =>{
    if (!template) {
        template = document.querySelector('#todo-app');
    }

    return template.content.firstElementChild.cloneNode(true);
}

const addEvents = (targetElement, events) => {
    const {addItem, clearCompleted, completedAll} = events

    targetElement
    .querySelector('.new-todo')
    .addEventListener('keypress', (e) => {
        if (e.key === 'Enter'){
            addItem(e.target.value);
            e.target.value = '';
        }
    })

    targetElement
    .querySelector('#toggle-all')
    .addEventListener('click', completedAll)

    targetElement
    .querySelector('.clear-completed')
    .addEventListener('click', clearCompleted)
} 

export default (targetElement, state ,events) => {
    const newApp = targetElement.cloneNode(true);

    newApp.innerHTML = ''
    newApp.appendChild(createNewAppNode());

    addEvents(newApp, events);

    return newApp;
}