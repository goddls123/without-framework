const TEMPLATE = '<ul class="todo-list"></ul>';

export const LIST_EVENTS = {
    DELETE_ITEM: 'DELETE_ITEM',
    UPDATE_ITEM: 'UPDATE_ITEM',
    TOGGLE_ITEM: 'TOGGLE_ITEM'
}
  

export default class List extends HTMLElement{
    static get observedAttributes() { 
        return ['todos', 'filter']; 
    }

    get todos() {
        if (!this.hasAttribute('todos')){
            return [];
        }

        return JSON.parse(this.getAttribute('todos'));
    }

    set todos(value) {
        if (value){
            this.setAttribute('todos', JSON.stringify(value));
        }
    }
    get filter() {
        if (!this.hasAttribute('filter')){
            return [];
        }

        return JSON.parse(this.getAttribute('filter'));
    }

    set filter(value) {
        if (value){
            this.setAttribute('filter', JSON.stringify(value));
        }
    }

    // event
    onDeleteClick(index) {
        const event = new CustomEvent(
            LIST_EVENTS.DELETE_ITEM,
            {
                detail: {
                    index
                }
            }
        )
        this.dispatchEvent(event);
    }
    onToggleClick(index) {
        const event = new CustomEvent(
            LIST_EVENTS.TOGGLE_ITEM,
            {
                detail: {
                    index
                }
            }
        )
        this.dispatchEvent(event);
    }

    onUpateItem(index, text) {
        const event = new CustomEvent(
            LIST_EVENTS.UPDATE_ITEM,
            {
                detail: {
                    index,
                    text
                }
            }
        )
    }

    createNewTodoNode() {
        return this.itemTemplate.content.firstElementChild.cloneNode(true);
    }

    getTodoElement(todo, index, LIST_events) {
        const {text, completed} = todo;
        
        const element = createNewTodoNode();
    
        element.querySelector('label').textContent = text;
        element.querySelector('input.edit').value = text;
    
        if (completed) {
            element.classList.add('completed');
            element.querySelector('input.toggle').checked = true;
        }
    
        element.querySelector('button.destory').dataset.index = index
        element.querySelector('input.edit').dataset.index = index
        element.querySelector('input.toggle').dataset.index = index
    
        element
        .addEventListener('dblclick', (e)=>{
        element.classList.add('editing');
        element.querySelector('input.edit').focus();
        })
    
        return element;
    }

    handleEventDelegate(LIST_events) {
        const {toggleItemCompleted, updateItem ,deleteItem} = LIST_events;

        this.list.addEventListener('click' , (e) =>{
            if (e.target.matches('button.destory')){
                this.onDeleteClick(e.target.dataset.index);
            }
            if (e.target.matches('input.toggle')) {
                this.onToggleClick(e.target.dataset.index)
            }
        })

        this.list.addEventListener('keypress', (e) => {
            if (e.target.matches('input.edit')){
                if (e.key === 'Enter'){
                    this.onUpateItem(e.target.dataset.index, e.target.value)
                    e.target.classList.remove('editing');
                }
            }
        })
    }
    filterTodos() {
        const isCompleted = todo => todo.completed;
        if (this.filter === 'Active'){
            return this.todos.filter(todo => !isCompleted(todo))
        }

        if (this.filter === 'Completed') {
            return this.todos.filter(isCompleted)
        }
    
        return [...this.todos]
    }

    updateList() {
        this.list.innerHTML = '';

        this.todos = this.filterTodos();
        this.todos
        .map(todo => this.getTodoElement(todo))
        .forEach(element => {
            this.appendChild(element);
        })
        
    }

    connectedCallback() {
        this.innerHTML = TEMPLATE;
        this.itemTemplate = document.getElementById('todo-item');
        this.list = this.querySelector('ul');

        this.handleEventDelegate();
        
        this.updateList();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.updateList();
    }

}