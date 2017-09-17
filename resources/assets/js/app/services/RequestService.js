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

const checkInternalServerError = (error) => {
    const status = ('' + error.response.status)[0];

    if (status === '5') {
        error.response.data = LangService.translate('errors.5xx_internal_server');
    }
};

const simpleRequest = axios.create(requestParams);
const securedRequest = axios.create(requestParams);

securedRequest.interceptors.request.use(setAuthHeaders, null);
securedRequest.interceptors.request.use(setLangHeaders, null);
simpleRequest.interceptors.request.use(setLangHeaders, null);

simpleRequest.interceptors.response.use(function (response) {
    // Do something with response data
    return response;

}, function (error) {
    checkInternalServerError(error);

    return Promise.reject(error);
});

securedRequest.interceptors.response.use(function (response) {
    // Do something with response data
    return response;

}, function (error) {
    checkInternalServerError(error);

    return Promise.reject(error);
});

export { simpleRequest, securedRequest };
