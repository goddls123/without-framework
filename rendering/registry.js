const registy = {};


const renderWrapper = (component) =>{
    return (targetElement, state) => {
        const element = component(targetElement, state);
    
        const childComponents = element.querySelectorAll('[data-component]');

        Array.from(childComponents)
        .forEach((target) => {
            const name = target.dataset.component;

            const child = registy[name];

            if (!child){
                return ;
            }

            target.replaceWith(child(target,state));
        })    
        return element;
    }
}

const add = ( name, component) => {
    registy[name] = renderWrapper(component);
}

const renderRoot = (root, state) =>{
    const newRoot = (root) =>{
        return root.cloneNode(true);
    }
    console.log(state);
    return renderWrapper(newRoot)(root,state);
}

export default {
    add ,
    renderRoot
}
