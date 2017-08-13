import axios from 'axios';
import { getAuthToken } from './AuthService';

const requestParams = {
    headers: {
        'Accept': 'application/json',
    }
};

export const makeRequest = (method, ...args) => {
    if (typeof axios[method] === 'function') {
        args.push(requestParams);

        return axios[method].apply(this, args);
    }
};

export const securedRequest = (method, ...args) => {
    requestParams.headers['Authorization'] = 'Bearer ' + getAuthToken();

    return makeRequest(method, ...args)
};

const RequestService = {
    makeRequest,
    securedRequest
};

export default RequestService;
