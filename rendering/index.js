// import appView from './view/app.js';
import getTodos from './getTodos.js';

import todosView from './view/todos.js';
import counterView from './view/counter.js';
import filtersView from './view/filters.js';
import registy from './registry.js'



const state = {
    todo: getTodos(),
    currentFilter: 'All'
}

registy.add('todos', todosView);
registy.add('counter', counterView);
registy.add('filters', filtersView);




window.requestAnimationFrame(() => {
    const main = document.querySelector('.todoapp');
    const newMain = registy.renderRoot(main,state);
    main.replaceWith(newMain);
})