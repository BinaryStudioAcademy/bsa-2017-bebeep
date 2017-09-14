import * as actions from './actionTypes';

const initialState = {
    onlineUsers: {},
    usersId: [1, 2],
    entities: {
        users: {
            byId: {
                1: {
                    id: 1,
                    first_name: 'Ivan',
                    last_name: 'Ivanov',
                    avatar: 'https://bootdey.com/img/Content/user_3.jpg'
                },
                2: {
                    id: 2,
                    first_name: 'Roman',
                    last_name: 'Romanov',
                    avatar: 'https://bootdey.com/img/Content/user_2.jpg'
                }
            }
        },
        messages: {
                byId: {
                    1: [
                        {
                            time: 1505384989,
                            text: 'some text',
                            status: 'received'
                        },
                        {
                            time: 1505384991,
                            text: 'some text2',
                            status: 'sent'
                        },
                        {
                            time: 1505384993,
                            text: 'some text3',
                            status: 'received'
                        },
                        {
                            time: 1505384995,
                            text: 'some text2',
                            status: 'sent'
                        },
                        {
                            time: 1505384997,
                            text: 'some text3',
                            status: 'received'
                        },
                        {
                            time: 1505384999,
                            text: 'some text2',
                            status: 'sent'
                        }
                    ],
                    2: [
                        {
                            time: 123456100,
                            text: 'some text',
                            status: 'received'
                        },
                        {
                            time: 123456105,
                            text: 'some text2',
                            status: 'sent'
                        }
                    ]
                }
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
                usersId: _.union(state.usersId, action.users),
                entities: {
                    ...state.entities,
                    users: {
                        byId: {
                            ...state.entities,
                            ...action.entities
                        }
                    }
                }
            };

        default:
            return state;
    }
};
