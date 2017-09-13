import * as actions from './actionTypes';

export const setOnlineUsers = (users) => ({
    type: actions.CHAT_SET_ONLINE_USERS,
    users: _.reduce(users, (result, user) => {
        result[user.id] = user;

        return result;
    }, {})
});

export const setOnline = (user) => ({
    type: actions.CHAT_SET_ONLINE,
    user
});

export const setOffline = (user) => ({
    type: actions.CHAT_SET_OFFLINE,
    user
});

export const clearUserList = () => ({
    type: actions.CHAT_CLEAR_USER_LIST
});

export const addUsersToList = data => {
    return _.reduce(data.data, (result, user) => {
        result.entities[user.id] = user;
        result.users.push(user.id);

        return result;
    }, {
        type: actions.CHAT_SET_USER_LIST,
        users: [],
        entities: {}
    });
};
