

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

        this.dispatchEvent(event);
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

    updateFilter() {

        if (!this.childElementCount){
            return;
        }
        Array.from(this.querySelectorAll('li a'))
        .forEach(a =>{
            if (a.textContent === this.filter){
                a.classList.add('selected');
            }
            else {
                a.classList.remove('selected');
            }
        })

      
    }

    updateCount(){
        if (!this.childElementCount){
            return;
        }
        
        const label = getTodoCount(this.todos);
  
        this.querySelector('.todo-count').textContent = label
    }

    connectedCallback() {
        window.requestAnimationFrame(() => {
            const template = document.getElementById('footer');
            const content = template.content.firstElementChild.cloneNode(true);
            this.appendChild(content);


            this.addEventListener('click', (e)=>{
                if (e.target.matches('a')){
                    e.preventDefault();
                    this.onClickFilter(e.target.textContent);
                }
                if (e.target.matches('button.clear-completed')) {
                    this.onClearCompleted();
                }
            });
            this.updateCount();
            this.updateFilter();
        })
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'filter'){
            this.updateFilter();
        }
        else if (name === 'todos'){
            this.updateCount();
        }
    }
}