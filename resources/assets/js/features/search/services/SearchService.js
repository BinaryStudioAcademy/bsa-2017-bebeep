import { browserHistory } from 'react-router';
import { simpleRequest } from 'app/services/RequestService';

export const search = (
    fromCoord, toCoord, start_at = null, page = 1, sort = 'price', order = 'asc', limit = 10, filter = {}
) => {
    return simpleRequest.get('/api/v1/trips/search', {
        params: setFilter(filter, {
            fc: encodeCoord(fromCoord),
            tc: encodeCoord(toCoord),
            start: start_at,
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

/**
 * Return filter from query
 * @returns {{}}
 */
export const getFilter = () => {
    const {query} = browserHistory.getCurrentLocation();
    let filter = {};
    if (+query["filter[price][min]"] >= 0 && +query["filter[price][max]"] > 0) {
        filter['price'] = [+query["filter[price][min]"], +query["filter[price][max]"]];
    }
    if (+query["filter[time][min]"] >= 0 && +query["filter[time][max]"] > 0) {
        filter['time'] = [+query["filter[time][min]"], +query["filter[time][max]"]];
    }
    if (+query["filter[date"] > 0) {
        filter['date'] = +query["filter[date"];
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
