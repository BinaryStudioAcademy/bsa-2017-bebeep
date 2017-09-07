import * as actions from './actionTypes';

const initialState = {
    subscriptions: [],
    entities: {
        subscriptions: {
            byId: {},
            allId: []
        },
        filters: {
            byId: {},
            allId: []
        }
    }
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.SUBSCRIPTION_SET_LIST:
            return {
                ...state,
                subscriptions: Object.keys(action.subscriptions),
                entities: {
                    ...state.entities,
                    subscriptions: {
                        byId: Object.assign(
                            state.entities.subscriptions.byId,
                            action.subscriptions
                        ),
                        allId: _.union(state.entities.subscriptions.allId, Object.keys(action.subscriptions))
                    },
                    filters: {
                        byId: Object.assign(
                            state.entities.filters.byId,
                            action.filters
                        ),
                        allId: _.union(state.entities.filters.allId, Object.keys(action.filters))
                    }
                }
            };
        case actions.SUBSCRIPTION_CHANGE_STATUS:
            return {
                ...state,
                entities: {
                    ...state.entities,
                    subscriptions: {
                        ...state.entities.subscriptions,
                        byId: {
                            ...state.entities.subscriptions.byId,
                            [action.id]: {
                                ...state.entities.subscriptions.byId[action.id],
                                is_active: action.active
                            }
                        }
                    }
                }
            };
        case actions.SUBSCRIPTION_DELETE:
            return {
                ...state,
                entities: {
                    ...state.entities,
                    subscriptions: {
                        ...state.entities.subscriptions,
                        byId: {
                            ...state.entities.subscriptions.byId,
                            [action.id]: {
                                ...state.entities.subscriptions.byId[action.id],
                                is_deleted: true
                            }
                        }
                    }
                }
            };
        case actions.SUBSCRIPTION_RESTORE:
            return {
                ...state,
                entities: {
                    ...state.entities,
                    subscriptions: {
                        ...state.entities.subscriptions,
                        byId: {
                            ...state.entities.subscriptions.byId,
                            [action.id]: {
                                ...state.entities.subscriptions.byId[action.id],
                                is_deleted: false
                            }
                        }
                    }
                }
            };
        default:
            return state;
    }
};
