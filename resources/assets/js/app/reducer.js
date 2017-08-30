import { combineReducers } from 'redux';

import user from '../features/user/reducer';
import vehicle from '../features/car/reducer';
import trip from '../features/trip/reducer';
import tripList from '../features/trip-list/reducer';
import { localeReducer as locale } from 'react-localize-redux';
import search from '../features/search/reducer';
import bookings from '../features/bookings/reducer';
import profile from '../features/public-profiles/reducer';
import tripWizard from 'features/wizard-trip/reducer';

export default combineReducers({
    user,
    search,
    locale,
    vehicle,
    trip,
    tripList,
    bookings,
    profile,
    tripWizard
});
