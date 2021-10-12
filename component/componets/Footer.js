

const getTodoCount = todos =>{
    const notCompleted = todos.filter(todo => !todo.completed)

    const {length} = notCompleted;
    if (length == 1){
        return ' 1 item left'
    }
    else {
        return `${length} item left`
    }
}

export const FILTER_EVENTS = {
    CHANGE_FILTER: 'CHANGE_FILTER',
    CLEAR_COMPLETE: 'CLEAR_COMPLETED'
}

export default class Footer extends HTMLElement{

    constructor() {
    }

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

    onClearCompleted() {
        const event = new CustomEvent(
            FILTER_EVENTS.CLEAR_COMPLETE
        )

        event.dispatchEvent(event);
    }

    onClickFilter(filter) {
        const event = new CustomEvent(
            FILTER_EVENTS.CHANGE_FILTER,
            {
                detail: {
                    filter
                }
            }
        )

        this.dispatchEvent(event);
    }

    updateList() {
        Array
        .from(this.querySelectorAll('li a'))
        .forEach(a =>{
            if (a.textContent === this.filter){
                a.classList.add('selected');
            }
            else {
                a.classList.remove('selected');
            }
        })

        const label = getTodoCount(this.todos);

        this.querySelector('span.todo-count').textContent = label;

        this.addEventListener('click', (e)=>{
            if (e.target.matches('a')){
                e.preventDefault();
                this.onClickFilter(e.target.textContent);
            }
            if (e.target.matches('button.clear-completed')) {
                e.preventDefault();
                this.onClearCompleted();
            }
        });
        
    }

    connectedCallback() {
        window.requestAnimationFrame(() => {
            const template = document.getElementById('footer');
            const content = template.firstElementChild.cloneNode(true);
            this.appendChild(content);

            this.updateList();
        })
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.updateList();
    }
}