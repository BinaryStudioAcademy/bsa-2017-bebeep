import * as actions from './actionTypes';

const initialState = {
    notifications: [],
    entities: {
        notifications: {
            byId: {},
            allId: []
        }
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.NOTIFICATION_SET_LIST:
            return {
                ...state,
                notifications: action.notifications,
                entities: {
                    ...state.entities,
                    notifications: {
                        ...state.entities.notifications,
                        byId: Object.assign(state.entities.notifications.byId, action.entities),
                        allId: _.union(state.entities.notifications.allId, action.notifications)
                    }
                }
            };
        case actions.NOTIFICATION_MARK_AS_READ:
            return {
                ...state,
                entities: {
                    ...state.entities,
                    notifications: {
                        ...state.entities.notifications,
                        byId: {
                            ...state.entities.notifications.byId,
                            [action.id]: {
                                ...state.entities.notifications.byId[action.id],
                                read: true
                            }
                        }
                    }
                }
            };
        default:
            return state;
    }
};
