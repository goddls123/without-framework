
export default (targetElement , {currentFilter}, events) =>{

    const newFilters = targetElement.cloneNode(true);

    Array
    .from(newFilters.querySelectorAll('li a'))
    .forEach(a =>{
        if (a.textContent === currentFilter){
            a.classList.add('selected');
        }
        else {
            a.classList.remove('selected');
        }

        a.addEventListener('click', (e)=>{
            e.preventDefault();
            events.changeFilter(a.textContent);
        });
    })


    return newFilters;
}