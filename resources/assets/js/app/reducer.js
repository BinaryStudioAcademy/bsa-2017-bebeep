import { combineReducers } from 'redux';

import vehicle from '../features/vehicle/reducer';
import tripsList from '../features/tripsList/reducer';

export default combineReducers({
    tripsList,vehicle,
});
