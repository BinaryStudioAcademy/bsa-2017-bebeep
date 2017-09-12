import * as actions from './actionsType';

const initialState = {
    onlineUsers: {}
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
        default:
            return state;
    }
};
