import {securedRequest} from './RequestService';

export const getNotifications = () => {
    return securedRequest.get('/api/v1/notifications');
};

export const markAsRead = (id) => {
    return securedRequest.patch(`/api/v1/notifications/${id}`);
};

export const getCountUnread = () => {
    return securedRequest.get('/api/v1/notifications/unread');
};
