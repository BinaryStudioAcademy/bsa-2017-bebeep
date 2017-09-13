import { browserHistory } from 'react-router';
import { simpleRequest } from 'app/services/RequestService';
import moment from 'moment';

export const search = (
    fromCoord, toCoord, start_at = null, page = 1, sort = 'price', order = 'asc', limit = 10, filter = {}
) => {
    const startDate = start_at !== null ? moment(start_at * 1000).hours(0).minute(0).seconds(0).unix() : null;

    return simpleRequest.get('/api/v1/trips/search', {
        params: setFilter(filter, {
            fc: encodeCoord(fromCoord),
            tc: encodeCoord(toCoord),
            start_at: startDate,
            sort,
            order,
            page,
            limit
        })
    })
};

/**
 * Add filter params to object
 *
 * @param filter
 * @param params
 * @returns {*}
 */
export const setFilter = (filter, params = {}) => {
    let newParams = {};

    Object.keys(filter).forEach(field => {
        if (filter[field] instanceof Array) {
            newParams[`filter[${field}][min]`] = filter[field][0];
            newParams[`filter[${field}][max]`] = filter[field][1];
            return;
        }

        if (filter[field]) {
            newParams[`filter[${field}]`] = filter[field];
            return;
        }

        newParams[`filter[${field}]`] = null;
    });

    return Object.assign(params, newParams);
};

/**
 * Return filter from query
 * @returns {{}}
 */
export const getFilter = () => {
    const {query} = browserHistory.getCurrentLocation();
    let filter = {};
    if (+query["filter[price][min]"] >= 0 && +query["filter[price][max]"] > 0) {
        filter['price'] = [+query["filter[price][min]"], +query["filter[price][max]"]];
    } else {
        filter['price'] = [0, 0];
    }
    if (+query["filter[time][min]"] >= 0 && +query["filter[time][max]"] > 0) {
        filter['time'] = [+query["filter[time][min]"], +query["filter[time][max]"]];
    } else {
        filter['time'] = [0, 24];
    }
    if (+query["start_at"] > 0) {
        filter['date'] = +query["start_at"];
    }
    if (query["filter[animals]"]) {
        filter['animals'] = query["filter[animals]"];
    } else {
        filter['animals'] = null;
    }
    if (query["filter[luggage]"]) {
        filter['luggage'] = query["filter[luggage]"];
    } else {
        filter['luggage'] = null;
    }
    if (query["filter[seats]"]) {
        filter['seats'] = query["filter[seats]"];
    } else {
        filter['seats'] = null;
    }
    if (query["filter[rating]"]) {
        filter['rating'] = query["filter[rating]"];
    } else {
        filter['rating'] = null;
    }
    if (query["filter[transfer]"]) {
        filter['transfers'] = query["filter[transfers]"];
    } else {
        filter['transfers'] = null;
    }
    return filter;
};

/**
 * Encode coords for query
 */
export const encodeCoord = (coord = {lng: null, lat: null}) =>
(+coord.lng) + '|' + (+coord.lat);

/**
 * Decode coords from query
 * @param coordinate
 * @returns {lat, lng}|null
 */
export const decodeCoord = (coordinate = '') => {
    if (!coordinate) {
        return null;
    }
    const coord = coordinate.split('|');
    if (coord.length !== 2) {
        return null;
    }
    if (isNaN(+coord[0]) || isNaN(+coord[1])) {
        return null;
    }
    return {lng: +coord[0], lat: +coord[1]}
};

/**
 * Add param to browser url, delete if key equal null
 *
 * @param param
 */
export const setUrl = (param = {}) => {
    const location = browserHistory.getCurrentLocation();
    let newLocation = Object.assign(location, {
        query: Object.assign(location.query, param)
    });
    for (let key in newLocation.query) {
        if (newLocation.query[key] === null) {
            delete(newLocation.query[key]);
        }
    }
    browserHistory.replace(newLocation);
};

export const getCurrentPage = (page, limit, totalSize) => {
    const countPage = totalSize / limit || 1;
    return page > countPage ? Math.ceil(countPage) : (page < 1 ? 1 : page);
};

export const getCountResult = (currentPage, lengthData, limit) => {
    return (currentPage - 1) * limit + lengthData;
};

/**
 * Transform data for subscription request
 *
 * @param toBeTransformed
 */
export const transformSubscriptionData = (toBeTransformed) => {
    return {
        start_point: {
            from: toBeTransformed.data.from.place,
            from_lat: toBeTransformed.data.from.coordinate.lat,
            from_lng: toBeTransformed.data.from.coordinate.lng
        },
        end_point: {
            to: toBeTransformed.data.to.place,
            to_lat: toBeTransformed.data.to.coordinate.lat,
            to_lng: toBeTransformed.data.to.coordinate.lng
        },
        start_at: toBeTransformed.data.start_at,
        email: toBeTransformed.subsEmail,
        filters: {
            animals: toBeTransformed.animals,
            luggage: toBeTransformed.luggage,
            seats: toBeTransformed.seats,
            rating: toBeTransformed.rating,
            transfer: toBeTransformed.transfer,
            price: {
                from: toBeTransformed.price[0],
                to: toBeTransformed.price[1]
            },
            time: {
                from: toBeTransformed.time[0],
                to: toBeTransformed.time[1]
            }
        }
    };
};

export const sendSubscribeRequest = (data) => {
    return simpleRequest.post('api/v1/subscription', data)
        .then(
            response => Promise.resolve(response)
        );
};