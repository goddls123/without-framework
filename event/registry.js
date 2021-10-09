const registy = {};


const renderWrapper = (component) =>{
    return (targetElement, state, events) => {
        const element = component(targetElement, state, events);
    
        const childComponents = element.querySelectorAll('[data-component]');

        Array.from(childComponents)
        .forEach((target) => {
            const name = target.dataset.component;

            const child = registy[name];

            if (!child){
                return ;
            }

            target.replaceWith(child(target,state, events));
        })    
        return element;
    }
}

const add = ( name, component) => {
    registy[name] = renderWrapper(component);
}

const renderRoot = (root, state, events) =>{
    const newRoot = (root) =>{
        return root.cloneNode(true);
    }
    return renderWrapper(newRoot)(root,state, events);
}

export default {
    add ,
    renderRoot
}
