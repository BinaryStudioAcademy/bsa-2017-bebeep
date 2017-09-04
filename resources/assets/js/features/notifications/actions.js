import * as actions from './actionTypes';

export const setNotifications = (notifications) => ({
    type: actions.NOTIFICATION_SET_LIST,
    notifications
});