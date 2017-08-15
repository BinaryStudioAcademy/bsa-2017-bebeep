import { combineReducers } from 'redux';
import vehicle from '../features/vehicle/reducer';
import user from '../features/user/reducer';
import trip from '../features/trip/reducer';
import searchResult from '../features/search/result/reducer';
import searchIndex from '../features/search/index/reducer';

export default combineReducers({
    vehicle,
    trip,
    user,
    searchResult,
    searchIndex,
});
