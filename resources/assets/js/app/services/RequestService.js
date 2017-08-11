import axios from 'axios';

export const MakeRequest = (method, ...args) => {
    if (typeof axios[method] === 'function') {
        return axios[method].apply(this, args);
    }
};

const RequestService = {
    MakeRequest
};

export default RequestService;