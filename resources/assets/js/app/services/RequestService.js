import axios from 'axios';
import AuthService from './AuthService';
import LangService from './LangService';

const requestParams = {
    headers: {
        'Accept': 'application/json'
    }
};

const setLangHeaders = (config) => {
    config.headers['User-Language'] = LangService.getActiveLanguage();
    return config;
};

const setAuthHeaders = (config) => {
    config.headers['Authorization'] = 'Bearer ' + AuthService.getAuthToken(); // TODO: token is GLOBAL STATE
    return config;
};

const simpleRequest = axios.create(requestParams);
const securedRequest = axios.create(requestParams);

securedRequest.interceptors.request.use(setAuthHeaders, null);
securedRequest.interceptors.request.use(setLangHeaders, null);
simpleRequest.interceptors.request.use(setLangHeaders, null);

export { simpleRequest, securedRequest };
