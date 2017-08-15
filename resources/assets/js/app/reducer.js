import { combineReducers } from 'redux';

import user from '../features/user/reducer';
import trip from '../features/trip/reducer';
import vehicle from '../features/vehicle/reducer';
import search from '../features/search/index/reducer';

export default combineReducers({
    user,
    trip,
    search,
    vehicle,
});
