import axios from 'axios';

export const makeRequest = (method, ...args) => {
    if (typeof axios[method] === 'function') {
        return axios[method].apply(this, args);
    }
};

export const securedRequest = (method, ...args) => {
    // do something with header (args[2].headers)
    if (typeof axios[method] === 'function') {
        return axios[method].apply(this, args);
    }
};

const RequestService = {
    makeRequest,
    securedRequest
};

export default RequestService;