import {securedRequest} from 'app/services/RequestService';

export const getSubscriptions = () => {
    return securedRequest.get('/api/v1/subscriptions');
};

export const changeSubscriptionStatus = (id, status) => {
    return securedRequest.put(`/api/v1/subscriptions/${id}/status`, {
        status: status ? 'activate' : 'deactivate'
    });
};

export const deleteSubscription = (id) => {
    return securedRequest.delete(`/api/v1/subscriptions/${id}/`);
};

export const restoreSubscription = (id) => {
    return securedRequest.delete(`/api/v1/subscriptions/trash/${id}/`);
};
