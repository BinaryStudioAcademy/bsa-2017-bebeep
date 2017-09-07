import {securedRequest} from 'app/services/RequestService';

export const getSubscriptions = () => {
    return securedRequest.get('/api/v1/subscriptions');
};
