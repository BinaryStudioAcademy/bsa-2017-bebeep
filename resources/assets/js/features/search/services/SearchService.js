import { makeRequest } from '../../../app/services/RequestService';
import { browserHistory } from 'react-router';

export const search = (
    tripData = {
        from: { coordinate: { lng: null, lat: null } },
        to: { coordinate: { lng: null, lat: null } },
        start_at: null
    }, page = 1, sort = 'price', order = 'asc', limit = 10,
    filter = {}
) => {
    const { from, to, start_at }= tripData;
    return makeRequest('get', '/api/v1/trips/search', {
        params: setFilter({
            fc: encodeCoord(from.coordinate),
            tc: encodeCoord(to.coordinate),
            start: start_at,
            sort,
            order,
            page,
            limit
        }, filter)
    })
};

export const setFilter = (params = {}, filter) => {
    let newParams = {};
    for (let field in filter) {
        if (filter[field]) {
            if (filter[field] instanceof Array) {
                newParams[`filter[${field}][min]`] = filter[field][0];
                newParams[`filter[${field}][max]`] = filter[field][1];
            } else {
                newParams[`filter[${field}]`] = filter[field];
            }
        }
    }
    return Object.assign(params, newParams);
};

export const encodeCoord = (coord = {lng: null, lat: null}) =>
    (+coord.lng) + '|' + (+coord.lat);

export const decodeCoord = (coordinate = '') => {
    const coord = coordinate.split('|');
    return {lng: +coord[0], lat: +coord[1]}
};

export const getDataFromQuery = (oldTripData) => {
    const { query } =  browserHistory.getCurrentLocation(),
        { from, to, start_at } = oldTripData;
    let newFrom = null,
        newTo = null,
        newStartAt = null;
    if (
        !from.coordinate.lat && !from.coordinate.lng
        &&
        query.fc && query.fn
    )
    {
        newFrom = {
            coordinate: decodeCoord(query.fc),
            name: query.fn
        }
    }
    if (
        !to.coordinate.lat && !to.coordinate.lng
        &&
        query.tc && query.tn
    )
    {
        newTo = {
            coordinate: decodeCoord(query.tc),
            name: query.tn
        }
    }
    if (!start_at && query.start_at) {
        newStartAt = +query.start_at;
    }
    if (newFrom || newTo || newStartAt) {
        return {
            from: newFrom || from,
            to: newTo || to,
            start_at: newStartAt || start_at
        };
    }
    return {};
};

export const setUrl = (param = {}) => {
    const {pathname, query} = browserHistory.getCurrentLocation();
    const params = Object.assign(query, param);
    let newQuery = [];
    for (let key in params) {
        newQuery.push(`${key}=${params[key]}`);
    }
    browserHistory.replace(`${pathname}?${newQuery.join('&')}`);
};