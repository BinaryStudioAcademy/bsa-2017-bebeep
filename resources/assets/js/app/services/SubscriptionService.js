import {securedRequest} from 'app/services/RequestService';

export const getSubscriptions = () => {
    return securedRequest.get('/api/v1/subscriptions');
};

export const changeSubscriptionStatus = (id, isActive) => {
    return securedRequest.put(`/api/v1/subscriptions/${id}/status`, {
        is_active: !!isActive
    });
};

export const deleteSubscription = (id) => {
    return securedRequest.delete(`/api/v1/subscriptions/${id}/`);
};

export const editSubscription = (id, data) => {
    return securedRequest.patch(`/api/v1/subscriptions/${id}/`, data);
};

export const transformFilterData = (data) => {
    const transformData = {
        data: {},
        add(prop, value) {
            this.data = (value !== null && value !== undefined)
                ? Object.assign({}, this.data, {[prop]: value})
                : this.data;

            return this;
        }
    };

    return transformData.add('animals', data.animals).
        add('luggage', data.luggage).
        add('seats', data.seats).
        add('rating', data.rating).
        add('price', {
            from: data.price[0],
            to: data.price[1],
            currency: data.currency,
        }).
        add('time', {
            from: data.time[0],
            to: data.time[1],
        })
        .data;
};
