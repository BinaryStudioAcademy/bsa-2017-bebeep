import * as actions from './actionTypes';

const initialState = {
    isUsersAdded: false,
    onlineUsers: {},
    usersId: [],
    entities: {
        users: {
            byId: {}
        }
    }
};

export default (state = initialState, action) => {
    switch(action.type) {
        case actions.CHAT_SET_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: {
                    ...state.onlineUsers,
                    ...action.users
                }
            };
        case actions.CHAT_SET_ONLINE:
            return {
                ...state,
                onlineUsers: {
                    ...state.onlineUsers,
                    [action.user.id]: action.user
                }
            };
        case actions.CHAT_SET_OFFLINE:
            return {
                ...state,
                onlineUsers: _.reduce(Object.keys(state.onlineUsers), (result, key) => {
                    if (state.onlineUsers[key].id !== action.user.id) {
                        result[key] = state.onlineUsers[key];
                    }

                    return result;
                }, {})
            };
        case actions.CHAT_CLEAR_USER_LIST:
            return {
                ...state,
                onlineUsers: {}
            };
        case actions.CHAT_SET_USER_LIST:
            return {
                ...state,
                isUsersAdded: action.status,
                usersId: _.union(state.usersId, action.users),
                entities: {
                    users: {
                        byId: {
                            ...state.entities.users.byId,
                            ...action.entities
                        }
                    }
                }
            };

        default:
            return state;
    }
};
