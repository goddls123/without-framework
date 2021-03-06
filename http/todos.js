// import http from "./http.js";
import http from "./fetch.js";
// import http from './axios.js';

const HEADERS = {
    "Content-Type": "application/json",
};

const BASE_URL = "http://localhost:8080/api/todos";

const list = () => http.get(BASE_URL);

// add, update, delete ,get

const create = (text) => {
    const todo = { text, completed: false };

    return http.put(BASE_URL, todo, HEADERS);
};

const update = (newTodo) => {
    const url = `${BASE_URL}/${newTodo.id}`;

    return http.patch(url, newTodo, HEADERS);
};

const deleteTodo = (id) => {
    const url = `${BASE_URL}/${id}`;

    return http.delete(url, HEADERS);
};

export default {
    create,
    list,
    update,
    deleteTodo,
};
