import {securedRequest} from './RequestService';

export const fetchGiven = () => {
    return securedRequest.get('/api/v1/reviews/given');
};

export const fetchReceived = () => {
    return securedRequest.get('/api/v1/reviews/received');
};
