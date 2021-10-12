import {LIST_EVENTS}  from './List.js';
import {FILTER_EVENTS} from './Footer.js';

export default class App extends HTMLElement{
    constructor() {
        super();
        this.state={
            todos: [],
            filter: 'All'
        };
        this.template = document.getElementById('todo-app')
    }

    syncAttributes() {
        this.list.todos = this.state.todos;
        this.list.filter = this.state.filter;
        this.footer.todos = this.state.todos;
        this.footer.filter = this.state.filter;
    }

    addItem = (text) => {
        this.state.todos.push({
            text ,
            completed :false
        })
        this.syncAttributes();
    }
    deleteItem = (index) => {
        this.state.todos.splice(index,1);
        this.syncAttributes();
    }

    updateItem = (index, text) => {
        this.state.todos[index].text = text
        this.syncAttributes();
    }
    toggleItemCompleted = (index) =>{
        this.state.todos[index].completed = !state.todos[index].completed;
        this.syncAttributes();
    }
    completedAll = () => {
        this.state.todos.forEach(todo => todo.completed = true);
        this.syncAttributes();
    }
    clearCompleted = ()=>{
        this.state.todos = state.todos.filter(todo => !todo.completed);
        this.syncAttributes();
    }
    changeFilter = (filter)=>{
        this.state.currentFilter = filter;
        this.syncAttributes();
    }

    eventHandler() {
        this.querySelector('.new-todo')
        .addEventListener('keypress', (e) => {
            if (e.key === 'Enter'){
                this.addItem(e.target.value);
                e.target.value = '';
            }
        })
        this.querySelector('input.toggle-all')
        .addEventListener('click', this.completedAll)

        this.list.addEventListener(LIST_EVENTS.DELETE_ITEM, (e) => {
            this.deleteItem(e.detail.index)
        })
        this.list.addEventListener(LIST_EVENTS.TOGGLE_ITEM, (e) => {
            this.toggleItemCompleted(e.detail.index);
        })
        this.list.addEventListener(LIST_EVENTS.UPDATE_ITEM, (e) => {
            this.updateItem(e.detail.index, e.detail.text);
        })

        this.footer.addEventListener(FILTER_EVENTS.CLEAR_COMPLETE, this.clearCompleted);
        this.footer.addEventListener(FILTER_EVENTS.CHANGE_FILTER, (e) => {
            this.changeFilter(e.detail.filter);
        })


    }
    

    connectedCallback() {
        window.requestAnimationFrame(() =>{
            const content = this.template.content.firstElementChild.cloneNode(true);
            this.appendChild(content);
            this.footer = this.querySelector('todomvc-footer');
            this.list = this.querySelector('todomvc-list');

            this.eventHandler();
            
            this.syncAttributes();

        })
    }
}