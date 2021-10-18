//render

render = () => {
    window.requestAnimationFrame(() => {});
};
const NEW_TODO_TEXT = "A simpel todo Element";
//dom 생성
const printResult = (action, result) => {
    const time = new Date().toDateString;
    const node = document.createElement("p");

    node.textContent = `${action.toUpperCase()} : ${JSON.stringify(
        result
    )}  (${time})`;

    document.querySelector("div").appendChild(node);
};
//event

//보여주기
