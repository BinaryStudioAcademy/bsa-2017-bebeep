import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import App from './App';
import NotFound from './layouts/NotFound';

import SearchIndex from '../features/search/layouts/SearchIndex';

import { LoginForm, Logout } from '../features/user/layouts/Login';
import PasswordReset from '../features/user/layouts/PasswordReset';
import { RegisterForm, RegisterSuccess, RegisterVerify } from '../features/user/layouts/Register';

import Dashboard from '../features/user/layouts/Dashboard';

import {
    ProfileBase,
    ProfileGeneral,
    ProfileAvatar,
    ProfilePassword
} from '../features/user/layouts/Profile';

import Vehicles from '../features/car/layouts/Vehicles';
import CreateVehicle from '../features/car/layouts/CreateVehicle';
import EditVehicle from '../features/car/layouts/EditVehicle';

import CreateTrip from '../features/trip/layouts/CreateTrip';

import EditTrip from '../features/trip/layouts/EditTrip';
import TripsList from '../features/trip-list/layouts/TripsList';
import DetailTrip from '../features/trip/layouts/DetailTrip';

import SearchResult from '../features/search/layouts/SearchResult';

import BookingsList from '../features/bookings/layouts/BookingsList';
import DriverPublicProfile from '../features/public-profiles/layouts/DriverPublicProfile';
import PassengerPublicProfile from '../features/public-profiles/layouts/PassengerPublicProfile';

import Elements from '../features/elements/Elements.js';

import { requireAuth, requireGuest } from '../app/services/AuthService';

import LangeService from './services/LangService';

export default (store) => {

    LangeService.init(store);

    LangeService.addTranslation(require('./lang/global.locale.json'));
    LangeService.addTranslation(require('./lang/validate.locale.json'));

    return (
        <Route path="/" component={ App }>

            <Route path="elements" component={Elements} />

            {/* Index page */}
            <IndexRoute component={ SearchIndex }/>

            {/* Trip creating and editing */}
            <Route path="trip">
                <Route path="create" component={ CreateTrip } />
                <Route path="edit/:id" component={ EditTrip } />
                <Route path=":id" component={DetailTrip}/>
            </Route>

            {/* Routes only for auth users */}
            <Route onEnter={ requireAuth }>

            {/* Vehicle creating and show details */}
            <Route path="vehicles">
                <IndexRoute component={ Vehicles } />
                <Route path="create" component={ CreateVehicle }/>
                <Route path="edit/:id" component={ EditVehicle }/>
                {/*<Route path=":id" component={ VehicleDetails } />*/}
            </Route>

                {/* Trips - upcoming and past */}
                <Redirect from='trips' to='/trips/upcoming'/>
                <Route path="trips">
                    <Route path="upcoming" component={ TripsList }/>
                    <Route path="past" component={ TripsList }/>
                </Route>

                {/* Trip creating and editing */}
                <Route path="trip">
                    <Route path="create" component={ CreateTrip }/>
                    <Route path="edit/:id" component={ Vehicles /*TripEdit*/ }/>
                </Route>

                {/* Bookings - upcomming and pasts */}
                <Route path="bookings" component={ BookingsList } />
                <Route path='bookings/past' component={ BookingsList } />

                {/* User dashboard */}
                <Route path="dashboard">
                    <IndexRoute component={ Dashboard }/>

                    {/* User profile */}
                    <Redirect from='profile' to='profile/general'/>
                    <Route path="profile" component={ ProfileBase }>
                        {/* User profile general */}
                        <Route path="general" component={ ProfileGeneral }/>
                        {/* User profile avatar */}
                        <Route path="avatar" component={ ProfileAvatar }/>
                        {/* User profile password */}
                        <Route path="password" component={ ProfilePassword }/>
                    </Route>
                </Route>

                {/* User logout */}
                <Route path="logout" component={ Logout }/>
            </Route>

            {/* Routes only for guest users */}
            <Route onEnter={ requireGuest }>
                {/* User registration and email verification */}
                <Route path="registration" component={ RegisterForm }/>
                <Route path="registration/success" component={ RegisterSuccess }/>
                <Route path="verification" component={ RegisterVerify }/>

                {/* User login and password reset */}
                <Route path="login" component={ LoginForm }/>
                <Route path="password/reset" component={ PasswordReset }/>
            </Route>

            {/*Driver public profile*/}
            <Route path="driver/:id" component={ DriverPublicProfile }/>

            {/*Passenger public profile*/}
            <Route path="passenger/:id" component={ PassengerPublicProfile }/>

            {/* Page not found */}
            <Route path="search" component={ SearchResult }/>

            {/* Page not found */}
            <Route path="*" component={ NotFound }/>
        </Route>
    );
};
