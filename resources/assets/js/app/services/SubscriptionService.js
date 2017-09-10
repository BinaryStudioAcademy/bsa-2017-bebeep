import {securedRequest} from 'app/services/RequestService';

export const getSubscriptions = () => {
    return securedRequest.get('/api/v1/subscriptions');
};

export const changeSubscriptionStatus = (id, isActive) => {
    return securedRequest.put(`/api/v1/subscriptions/${id}/status`, {
        is_active: !!isActive
    });
};

export const deleteSubscription = (id) => {
    return securedRequest.delete(`/api/v1/subscriptions/${id}/`);
};

export const editSubscription = (id, data) => {
    return securedRequest.patch(`/api/v1/subscriptions/${id}/`, data);
};
