// import appView from './view/app.js';
import getTodos from './getTodos.js';

import todosView from './view/todos.js';
import counterView from './view/counter.js';
import filtersView from './view/filters.js';
import registy from './registry.js';
import applyDiff from './applyDiff.js';


const state = {
    todos: getTodos(),
    currentFilter: 'All'
}

registy.add('todos', todosView);
registy.add('counter', counterView);
registy.add('filters', filtersView);



const render = () =>{
    window.requestAnimationFrame(() => {
        const main = document.querySelector('.todoapp');
        const newMain = registy.renderRoot(main,state);
        applyDiff(document.body, main, newMain);
        // main.replaceWith(newMain);
    })
}

window.setInterval(() =>{
    state.todos = getTodos();
    render();
}, 5000)


