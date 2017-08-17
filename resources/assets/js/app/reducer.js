import { combineReducers } from 'redux';
import vehicle from '../features/vehicle/reducer';
import user from '../features/user/reducer';
import trip from '../features/trip/reducer';
import tripList from '../features/trip-list/reducer';
import search from '../features/search/index/reducer';
import { localeReducer as locale } from 'react-localize-redux';

export default combineReducers({
    vehicle,
    trip,
    user,
    search,
    tripList,
    locale
});
