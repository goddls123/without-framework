// 파싱
const parseResponse = async (response) => {
    const { status } = response;
    let data;
    if (status !== 204) {
        data = await response.json();
    }

    return {
        status,
        data,
    };
};

// 실헹

const request = (param) => {
    const { headers = {}, body, method = "GET", url } = param;
    const config = {
        method,
        headers: new window.Headers(headers),
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const reponse = await window.fetch(url, config);

    return parseResponse(reponse);
};

// 함수

const get = async (url, headers) => {
    const response = await request({ url, headers, method: "GET" });
    return response.data;
};

const post = async (url, body, headers) => {
    const response = await request({ url, headers, body, method: "POST" });
    return response.data;
};

const put = async (url, body, headers) => {
    const response = await request({ url, headers, body, method: "PUT" });
    return response.data;
};

const patch = async (url, body, headers) => {
    const response = await request({ url, headers, body, method: "PATCH" });
    return response.data;
};

const deleteRequest = async (url, body, headers) => {
    const response = await request({ url, headers, body, method: "DELTE" });
    return response.data;
};

export default {
    get,
    post,
    put,
    patch,
    delete: deleteRequest,
};
