import * as actions from './actionTypes';

const initialState = {
    usersId: [],
    entities: {
        users: {
            byId: {}
        }
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
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
