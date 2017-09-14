import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import App from './App';
import NotFound from './layouts/NotFound';

import { SearchIndex, SearchResult } from '../features/search/layouts';

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

import { ReviewsReceived, ReviewsGiven } from '../features/user/layouts/Profile/Reviews';
import { DriverPublicProfile, PassengerPublicProfile } from '../features/public-profiles/layouts';

import { Vehicles, CreateVehicle, EditVehicle } from '../features/car/layouts';

import { CreateTrip, EditTrip, TripDetails } from '../features/trip/layouts';
import TripsList from '../features/trip-list/layouts/TripsList';

import BookingsList from '../features/bookings/layouts/BookingsList';
import Notifications from 'features/notifications/layouts/Notifications';
import Subscriptions from 'features/subscriptions/layouts/Subscriptions';
import UserListPage from 'features/chat/layouts/UserListPage';

import AuthService from './services/AuthService';
import { RequireUser, RequireGuest } from './components/Auth';
import { USER_ROLE_PASSENGER, USER_ROLE_DRIVER } from './services/UserService';

import MessagingPage from '../features/chat/layouts/MessagingPage';

import LangeService from './services/LangService';
import DataStorage from './helpers/DataStorage';

import Elements from '../features/elements/Elements';

export default (store) => {
    DataStorage.init();

    AuthService.init(store);
    LangeService.init(store);

    LangeService.addTranslation(require('./lang/global.locale.json'));
    LangeService.addTranslation(require('./lang/validate.locale.json'));

    return (
        <Route path="/" component={ App }>

            <Route path="elements" component={ Elements } />

            {/* Index page */}
            <IndexRoute component={ SearchIndex } />
            {/* Search page */}
            <Route path="search" component={ SearchResult } />

            {/* Routes only for auth users with the driver permission */}
            <Route component={ RequireUser({ permissions: USER_ROLE_DRIVER }) }>

                {/* Vehicle creating and show details */}
                <Route path="vehicles">
                    <IndexRoute component={ Vehicles } />
                    <Route path="create" component={ CreateVehicle } />
                    <Route path="edit/:id" component={ EditVehicle } />
                    {/*<Route path=":id" component={ VehicleDetails } />*/}
                </Route>

                {/* Trips - upcoming and past */}
                <Redirect from="trips" to="/trips/upcoming" />
                <Route path="trips">
                    <Route path="upcoming" component={ TripsList } />
                    <Route path="past" component={ TripsList } />
                </Route>

                {/* Trip creating and editing */}
                <Route path="trip">
                    <Route path="create" component={ CreateTrip } />
                    <Route path="edit/:id" component={ EditTrip } />
                </Route>
            </Route>

            {/* Routes only for auth users with the passenger permission */}
            <Route component={ RequireUser({ permissions: USER_ROLE_PASSENGER }) }>
                {/* Bookings - upcomming and pasts */}
                <Route path="bookings" component={ BookingsList } />
                <Route path="bookings/past" component={ BookingsList } />
            </Route>

            {/* Routes only for auth users */}
            <Route component={ RequireUser() }>

                {/* User dashboard */}
                <Route path="dashboard">
                    <IndexRoute component={ Dashboard } />

                    {/* User profile */}
                    <Redirect from="profile" to="profile/general" />
                    <Route path="profile" component={ ProfileBase }>
                        {/* User profile general */}
                        <Route path="general" component={ ProfileGeneral } />
                        {/* User profile avatar */}
                        <Route path="avatar" component={ ProfileAvatar } />

                        {/* User reviews */}
                        <Route path="reviews">
                            {/* User received reviews */}
                            <Route path="received" component={ ReviewsReceived } />
                            { /*User given reviews */ }
                            <Route path="given" component={ ReviewsGiven } />
                        </Route>

                        {/* User profile password */}
                        <Route path="password" component={ ProfilePassword } />
                    </Route>

                    {/* Notifications */}
                    <Route path="notifications" component={ Notifications } />

                    {/* Subscriptions */}
                    <Route path="subscriptions" component={ Subscriptions } />

                    {/* Users list */}
                    <Route path="users" component={UserListPage} />
                </Route>

                {/* User logout */}
                <Route path="logout" component={ Logout } />

                {/* Messaging */}
                <Route path="messages">
                    <Route path=":id" component={ MessagingPage } />
                </Route>
            </Route>

            {/* Routes only for guest users */}
            <Route component={ RequireGuest() }>
                {/* User registration and email verification */}
                <Route path="registration" component={ RegisterForm } />
                <Route path="registration/success" component={ RegisterSuccess } />
                <Route path="verification" component={ RegisterVerify } />

                {/* User login and password reset */}
                <Route path="login" component={ LoginForm } />
                <Route path="password/reset" component={ PasswordReset } />
            </Route>

            {/* Trip details. Must stay HERE - conflict with /trip/create */}
            <Route path="trip/:id" component={ TripDetails } />

            {/*Driver public profile*/}
            <Route path="driver/:id" component={ DriverPublicProfile } />

            {/*Passenger public profile*/}
            <Route path="passenger/:id" component={ PassengerPublicProfile } />

            {/* Page not found */}
            <Route path="*" component={ NotFound } />
        </Route>
    );
};
