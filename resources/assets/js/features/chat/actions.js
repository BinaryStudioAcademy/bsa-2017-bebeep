import * as actions from './actionTypes';
import {securedRequest} from 'app/services/RequestService'

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

export const fillUsersList = () => dispatch => {
    securedRequest.get('/api/v1/users/others')
        .then(response => dispatch(addUsersToList(response.data)))
        .catch(error => {
            console.error(error);
            dispatch(addUsersToList({data: {}}));
        });
};
