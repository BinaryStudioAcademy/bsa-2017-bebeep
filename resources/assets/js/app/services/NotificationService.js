import {securedRequest} from './RequestService';

export const getNotifications = () => {
    return securedRequest.get('/api/v1/notifications');
};

export const markAsRead = (id) => {
    return securedRequest.put(`/api/v1/notifications/${id}/status`, {
        status: "read"
    });
};

export const getCountUnread = () => {
    return securedRequest.get('/api/v1/notifications/unread/count');
};
