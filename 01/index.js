import appView from './view/app.js';
import getTodos from './getTodos.js';



const state = {
    todo: getTodos(),
    currentFilter: 'All'
}


const main = document.querySelector('.todoapp');

window.requestAnimationFrame(() => {
    const newMain = appView(main, state);
    main.replaceWith(newMain);
})