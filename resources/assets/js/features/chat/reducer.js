import * as actions from './actionTypes';

export const MESSAGE_STATUS_RECIEVED = 'received';
export const MESSAGE_STATUS_SENT = 'sent';

const initialState = {
    onlineUsers: {},
    usersId: [],
    entities: {
        users: {
            byId: {}
        },
        chats: {
            byUserId: {}
        }
    },
    usersListNoActive: false,
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
                usersId: action.users,
                entities: {
                    ...state.entities,
                    users: {
                        byId: {
                            ...state.entities.users.byId,
                            ...action.entities
                        }
                    }
                }
            };
        case actions.CHAT_SET_USER_LIST_NO_ACTIVE:
            return {
                ...state,
                usersListNoActive: action.status,
            };

        case actions.CHAT_RECEIVE_MESSAGE:
            const msgSender = action.message.sender.data;

            const newUser = !state.entities.users.byId[msgSender.id]
                ? { [msgSender.id]: msgSender }
                : {};

            if (state.usersId.indexOf(msgSender.id) === -1) {
                state.usersId.push(msgSender.id);
            }

            return {
                ...state,
                entities: {
                    ...state.entities,
                    chats: {
                        ...state.entities.chats,
                        byUserId: {
                            ...state.entities.chats.byUserId,
                            [action.message.sender_id]: [
                                ...state.entities.chats.byUserId[action.message.sender_id] || [],
                                {
                                    id: action.message.id,
                                    time: action.message.created_at_x,
                                    text: action.message.message,
                                    status: MESSAGE_STATUS_RECIEVED
                                }
                            ]
                        }
                    },
                    users: {
                        byId: {
                            ...state.entities.users.byId,
                            ...newUser,
                        },
                    },
                    usersId: state.usersId,
                },
            };

        case actions.CHAT_SEND_MESSAGE:
            return {
                ...state,
                entities: {
                    ...state.entities,
                    chats: {
                        byUserId: {
                            ...state.entities.chats.byUserId,
                            [action.data.userId]: [
                                ...state.entities.chats.byUserId[action.data.userId],
                                {
                                    id: action.data.id,
                                    time: action.data.time,
                                    text: action.data.text,
                                    status: MESSAGE_STATUS_SENT
                                }
                            ]
                        }
                    }
                }
            };
        case actions.CHAT_SET_USER_MESSAGES:
            return {
                ...state,
                entities: {
                    ...state.entities,
                    chats: {
                        ...state.entities.chats,
                        byUserId: {
                            ...state.entities.chats.byUserId,
                            [action.userId]: action.chat,
                        }
                    }
                }
            };
        default:
            return state;
    }
};
