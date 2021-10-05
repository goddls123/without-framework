import todosView from './view/todos.js';
import counterView from './view/counter.js';
import filtersView from './view/filters.js';
import registy from './registry.js';
import appView from './view/app.js';
import applyDiff from './applyDiff.js';

import getTodos from './getTodos.js'

const state = {
    todos: getTodos(),
    currentFilter: 'All'
}

registy.add('todos', todosView);
registy.add('counter', counterView);
registy.add('filters', filtersView);
registy.add('app', appView);



const render = () =>{
    window.requestAnimationFrame(() => {
        const main = document.querySelector('#root');
        const newMain = registy.renderRoot(main,state);
        applyDiff(document.body, main, newMain);
    })
}

window.setInterval(() =>{
    state.todos = getTodos();
    render();
}, 5000)


