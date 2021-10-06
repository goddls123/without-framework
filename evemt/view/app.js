
let template;

const createNewAppNode = () =>{
    if (!template) {
        template = document.querySelector('#todo-app');
    }

    return template.content.firstElementChild.cloneNode(true);
}

const addEvents = (targetElement, events) => {

    targetElement
    .querySelector('.new-todo')
    .addEventListener('keypress', (event) => {
        if (event.key === 'Enter'){
            events.addItem(event.target.value);
            event.target.value = '';
        }
    })
} 

export default (targetElement, state ,events) => {
    const newApp = targetElement.cloneNode(true);

    newApp.innerHTML = ''
    newApp.appendChild(createNewAppNode());

    addEvents(newApp, events);

    return newApp;
}