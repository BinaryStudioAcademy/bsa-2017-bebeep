import { combineReducers } from 'redux';

import user from '../features/user/reducer';
import search from '../features/search/index/reducer';
import vehicle from '../features/vehicle/reducer';
import trip from '../features/trip/reducer';
import tripList from '../features/trip-list/reducer';

export default combineReducers({
    user,
    search,
    vehicle,
    trip,
    tripList,
});
