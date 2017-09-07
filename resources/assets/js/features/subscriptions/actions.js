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
