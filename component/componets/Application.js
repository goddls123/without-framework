import {LIST_EVENTS}  from './List.js';

export default class App extends HTMLElement{
    constructor() {
        super();
        this.state={
            todos: [],
            filter: 'All'
        };
        this.template = document.getElementById('todo-app')
    }

    asycAttributes() {
        this.list.todos = this.state.todos;
        this.footer.todos = this.state.todos;
        this.footer.filter = this.state.filter;
    }

    addItem = (text) => {
        this.state.todos.push({
            text ,
            completed :false
        })
        this.asycAttributes();
    }
    deleteItem = (index) => {
        this.state.todos.splice(index,1);
        this.asycAttributes();
    }

    updateItem = (index, text) => {
        this.state.todos[index].text = text
        this.asycAttributes();
    }
    toggleItemCompleted = (index) =>{
        this.state.todos[index].completed = !state.todos[index].completed;
        this.asycAttributes();
    }
    completedAll = () => {
        this.state.todos.forEach(todo => todo.completed = true);
        this.asycAttributes();
    }
    clearCompleted = ()=>{
        this.state.todos = state.todos.filter(todo => !todo.completed);
        this.asycAttributes();
    }
    changeFilter = (filter)=>{
        this.state.currentFilter = filter;
        this.asycAttributes();
    }

    eventHandler() {
        this.querySelector('.new-todo')
        .addEventListener('keypress', (e) => {
            if (e.key === 'Enter'){
                addItem(e.target.value);
                e.target.value = '';
            }
        })
        this.querySelector('input.toggle-all')
        .addEventListener('click', completedAll)

        this.list.addEventListener(LIST_EVENTS.DELETE_ITEM, (e) => {
            this.deleteItem(e.detail.index)
        })
        this.list.addEventListener(LIST_EVENTS.TOGGLE_ITEM, (e) => {
            this.toggleItemCompleted(e.detail.index);
        })
        this.list.addEventListener(LIST_EVENTS.UPDATE_ITEM, (e) => {
            this.updateItem(e.detail.index, e.detail.text);
        })


    }
    

    connectedCallback() {
        window.requestAnimationFrame(() =>{
            const content = this.template.content.firstElementChild.cloneNode(true);
            this.appendChild(content);
            this.footer = this.querySelector('todomvc-footer');
            this.list = this.querySelector('todomvc-list');

            this.eventHandler();
            
            this.footer.addEventListener();
            this.syncAttributes();

        })
    }
}