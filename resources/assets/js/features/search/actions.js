import * as actions from './actionTypes';

export const searchSuccess = data => ({
    type: actions.SEARCH_INDEX_SUCCESS,
    data
});

export const setSearchFilters = filters => ({
    type: actions.SEARCH_FILTER_UPDATE,
    filters
});

export const updateStartTime = time => ({
    type: actions.UPDATE_START_TIME,
    time
});