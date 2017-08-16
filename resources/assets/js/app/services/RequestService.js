import axios from 'axios';
import { getAuthToken } from './AuthService';

const requestParams = {
    headers: {
        'Accept': 'application/json',
    }
};

const setAuthHeaders = (config) => {
    config.headers['Authorization'] = 'Bearer ' + getAuthToken(); // TODO: token is GLOBAL STATE

    return config;
};

const simpleRequest = axios.create(requestParams);
const securedRequest = axios.create(requestParams);

securedRequest.interceptors.request.use(setAuthHeaders, null);

export { simpleRequest, securedRequest };
