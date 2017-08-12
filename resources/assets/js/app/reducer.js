import { combineReducers } from 'redux';
import vehicle from '../features/vehicle/reducer';
import user from '../features/user/reducer';
import trip from '../features/trip/reducer';
import tripsList from '../features/tripsList/reducer';


export default combineReducers({
    vehicle,
    trip,
    user,
    tripsList,

});
