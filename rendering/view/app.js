
import todosView from './todos.js';
import counterView from './counter.js';
import filtersView from './filters.js';

export default (targetElement, state) => {
    const element = targetElement.cloneNode(true);

    console.log("appView")

    const list = element.querySelector('.todo-list');
    const counter = element.querySelector('.counter');
    const filters = element.querySelector('.filters');
    
    list.replaceWith(todosView(list, state));
    counter.replaceWith(counterView(counter, state));
    filters.replaceWith(filtersView(filters, state));

    return element;
}