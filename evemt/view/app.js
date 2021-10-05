
let template;

const createNewAppNode = () =>{
    if (!template) {
        template = document.querySelector('#todo-app');
    }

    return template.content.firstElementChild.cloneNode(true);
}

export default (targetElement) => {
    const newApp = targetElement.cloneNode(true);
    newApp.innerHTML = ''
    newApp.appendChild(createNewAppNode());
    return newApp;
}