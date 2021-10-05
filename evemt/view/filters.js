
export default (targetElement , {currentFilter}) =>{

    const newFilters = targetElement.cloneNode(true);

    Array
    .from(newFilters.querySelector('li a'))
    .forEach(a =>{
        if (a.textContent === currentFilter){
            a.classList.add('selected');
        }
        else {
            a.classList.remove('selected');
        }
    })

    return newFilters;
}