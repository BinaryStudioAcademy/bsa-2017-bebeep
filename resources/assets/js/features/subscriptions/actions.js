import * as actions from './actionTypes';

export const setSubscriptions = (data) => {
    return _.reduce(data.data, (result, subscription) => {
        const filters = _.reduce(subscription.filters.data, (result , filter) => {
                result[filter.id] = filter;

                return result;
            }, {});
        result.subscriptions[subscription.id] = Object.assign(subscription, {
            filters: Object.keys(filters)
        });

        result.filters = Object.assign(result.filters, filters);

        return result;
    }, {
        type: actions.SUBSCRIPTION_SET_LIST,
        subscriptions: {},
        filters: {}
    });
};

export const actionChangeSubscriptionStatus = (id, active) => ({
    type: actions.SUBSCRIPTION_CHANGE_STATUS,
    id,
    active
});

export const actionDeleteSubscription = (id) => ({
    type: actions.SUBSCRIPTION_DELETE,
    id
});

export const editSubscriptions = (data) => {
    const filters = _.reduce(data.data.filters.data, (result , filter) => {
        result[filter.id] = filter;

        return result;
    }, {});

    return {
        type: actions.SUBSCRIPTION_EDIT,
        subscriptions: {
            [data.data.id]: Object.assign(data.data, {
                filters: Object.keys(filters),
            })
        },
        filters: filters
    };
};