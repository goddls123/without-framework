import todosView from './view/todos.js';
import counterView from './view/counter.js';
import filtersView from './view/filters.js';
import registy from './registry.js';
import appView from './view/app.js';
import applyDiff from './applyDiff.js';
import todos from './view/todos.js';


const state = {
    todos: [],
    currentFilter: 'All'
}

registy.add('todos', todosView);
registy.add('counter', counterView);
registy.add('filters', filtersView);
registy.add('app', appView);


const events = {
    addItem: (text) => {
        state.todos.push({
            text ,
            completed :false
        })
        render();
    },
    updateItem: (index, text) => {
        state.todos[index].text = text;
        render();
    },
    deleteItem: (index) => {
        state.todos.splice(index,1);
        render();
    },
    toggleItemCompleted: (index) =>{
        state.todos[index].completed = !state.todos[index].completed;
        render();
    },
    competedAll: () => {
        state.todos.forEach(todo => todo.completed = true);
        render();
    },
    clearCompleted: ()=>{
        state.todos = state.todos.filter(todo => !todo.completed);
        render();
    },
    changeFilter: (filter)=>{
        state.currentFilter = filter;
        render();
    },
}

const render = () =>{
    window.requestAnimationFrame(() => {
        const main = document.querySelector('#root');

        const newMain = registy.renderRoot(main, state, events);

        applyDiff(document.body, main, newMain);
    })
}


render();

