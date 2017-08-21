import * as actions from './actionTypes';

export const selectCarSuccess = data => ({
    type: actions.GET_MODEL_BRAND_SUCCESS,
    data
});