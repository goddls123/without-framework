const registy = {};


const renderWrapper = (component) =>{
    return (targetElement, state) => {
        const element = targetElement.cloneNode(true);
    
        const childComponent = element.querySelector('[data-component]');


        Array.from(childComponent)
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
    const newRoot = root.cloneNode(true);

    return renderWrapper(newRoot)(root,state);
}

export default {
    add ,
    renderRoot
}
