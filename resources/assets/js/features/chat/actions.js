import {browserHistory} from 'react-router';

import * as actions from './actionTypes';
import {MESSAGE_STATUS_RECIEVED, MESSAGE_STATUS_SENT} from './reducer';

import {securedRequest} from 'app/services/RequestService';
import AuthService from 'app/services/AuthService';
import {isThisIdOfAuthUser} from 'app/services/UserService';

export const setOnlineUsers = (users) => {
    const sessionUserId = AuthService.getUserId();

    return {
        type: actions.CHAT_SET_ONLINE_USERS,
        users: _.reduce(users, (result, user) => {
            if (user.id !== sessionUserId) {
                result[user.id] = user;
            }
            return result;
        }, {}),
    };
};

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

export const updateMessagesInGlobalState = (data) => ({
    type: actions.CHAT_SEND_MESSAGE,
    data
});

export const sendMessage = (data) => dispatch => {
    let sendedData = {
        message: data.text
    };
    securedRequest.post('/api/v1/users/' + data.userId + '/messages', sendedData)
        .then((response) => {
            data.id = response.data.data.id;
            dispatch(updateMessagesInGlobalState(data));
        });
};

export const fillUsersList = () => dispatch => {
    securedRequest.get('/api/v1/users/others')
        .then(response => dispatch(addUsersToList(response.data)))
        .catch(error => {
            console.error(error);
            dispatch(addUsersToList({data: {}}));
        });
};

export const addUser = (userId) => dispatch => {
    securedRequest.get(`/api/v1/users/${userId}`)
        .then(response => dispatch(addUsersToList({data: [response.data.data]})))
        .catch(error => {
            console.error(error);
            dispatch(addUsersToList({data: []}));
        });
};

export const receiveMessage = (message) => {
    return {
        type: actions.CHAT_RECEIVE_MESSAGE,
        message
    };
};

export const addMessagesToChat = (userId, messages) => {
    return _.reduce(messages.data, (result, message) => {
        result.chat.push({
            id: message.id,
            time: message.created_at_x,
            text: message.message,
            status: message.sender_id == userId ? MESSAGE_STATUS_RECIEVED : MESSAGE_STATUS_SENT
        });

        return result;
    }, {
        type: actions.CHAT_SET_USER_MESSAGES,
        chat: [],
        userId
    })
};

export const getMessagesByUser = (userId) => dispatch => {
    if (isThisIdOfAuthUser(userId)) {
        browserHistory.push('/dashboard/users');
        return false;
    }

    securedRequest.get(`/api/v1/users/${userId}/messages`)
        .then(response => dispatch(addMessagesToChat(userId, response.data)))
        .catch(error => {
            console.error(error);
            dispatch(addMessagesToChat(userId, {data: {}}));
        });
};
