import { combineReducers } from 'redux';

import vehicle from '../features/vehicle/reducer';
import user from '../features/user/reducer';

export default combineReducers({
    vehicle,
    user,
});
