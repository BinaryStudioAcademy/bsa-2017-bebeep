import * as actions from './actionTypes';

export const setNotifications = (data) => {
    return _.reduce(data, (collection, notification) => {
            collection['entities'][notification.id] = notification;
            collection['notifications'].push(notification.id);

            return collection;
        }, {
            type: actions.NOTIFICATION_SET_LIST,
            entities: {},
            notifications: []
        });
};

export const markAsReadNotification = (id) => ({
    type: actions.NOTIFICATION_MARK_AS_READ,
    id
});
