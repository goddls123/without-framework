import http from "./http.js";

const HEADERS = {
    "Content-Type": "application/json",
};

const BASE_URL = "/api/todos";

const list = () => http.get(BASE_URL);
