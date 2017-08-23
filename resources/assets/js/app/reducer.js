import { combineReducers } from 'redux';

import user from '../features/user/reducer';
import vehicle from '../features/car/reducer';
import trip from '../features/trip/reducer';
import tripList from '../features/trip-list/reducer';
import { localeReducer as locale } from 'react-localize-redux';
import search from '../features/search/reducer';

export default combineReducers({
    user,
    search,
    locale,
    vehicle,
    trip,
    tripList,
});
