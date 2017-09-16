import axios from 'axios';
import AuthService from './AuthService';
import LangService, { LANG_PROP_CODE } from './LangService';

const requestParams = {
    headers: {
        'Accept': 'application/json'
    }
};

const setLangHeaders = (config) => {
    config.headers['User-Language'] = LangService.getActiveLanguage(LANG_PROP_CODE);
    return config;
};

const setAuthHeaders = (config) => {
    config.headers['Authorization'] = 'Bearer ' + AuthService.getSessionToken();
    return config;
};

const simpleRequest = axios.create(requestParams);
const securedRequest = axios.create(requestParams);

securedRequest.interceptors.request.use(setAuthHeaders, null);
securedRequest.interceptors.request.use(setLangHeaders, null);
simpleRequest.interceptors.request.use(setLangHeaders, null);

export { simpleRequest, securedRequest };
