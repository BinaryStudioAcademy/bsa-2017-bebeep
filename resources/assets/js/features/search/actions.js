import * as actions from './actionTypes';

export const searchResult = data => ({
    type: actions.SEARCH_RESULT_SUCCESS,
    data
});

export const searchSuccess = data => ({
    type: actions.SEARCH_INDEX_SUCCESS,
    data
});

export const filter = data => ({
    type: actions.SEARCH_FILTER,
    data
});
