import * as actions from './actionsType';

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
