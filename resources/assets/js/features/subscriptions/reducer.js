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
        default:
            return state;
    }
};
