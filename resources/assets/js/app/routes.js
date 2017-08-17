import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import App from './App';
import NotFound from './layouts/NotFound';

import SearchIndex from '../features/search/index/layouts/SearchIndex';

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

import Vehicles from '../features/vehicle/layouts/Vehicles';
import VehicleDetails from '../features/vehicle/layouts/VehicleDetails';

import CreateTrip from '../features/trip/layouts/CreateTrip';
import TripsList from '../features/trip-list/layouts/TripsList';

import { requireAuth, requireGuest } from '../app/services/AuthService';

export default (
    <Route path="/" component={ App }>
        {/* Index page */}
        <IndexRoute component={ SearchIndex } />

        {/* Routes only for auth users */}
        <Route onEnter={ requireAuth }>

            {/* Vehicle creating and show details */}
            <Route path="vehicles">
                <IndexRoute component={ Vehicles } />
                <Route path="create" component={ Vehicles } />
                <Route path=":id" component={ VehicleDetails } />
            </Route>

            {/* Trips - upcoming and past */}
            <Redirect from='trips' to='/trips/upcoming'/>
            <Route path="trips">
                <Route path="upcoming" component={ TripsList } />
                <Route path="past" component={ TripsList } />
            </Route>

            {/* Trip creating and editing */}
            <Route path="trip">
                <Route path="create" component={ CreateTrip } />
                <Route path="edit/:id" component={ Vehicles /*TripEdit*/ } />
            </Route>

            {/* User dashboard */}
            <Route path="dashboard">
                <IndexRoute component={ Dashboard } />

                {/* User profile */}
                <Redirect from='profile' to='profile/general' />
                <Route path="profile" component={ ProfileBase }>
                    {/* User profile general */}
                    <Route path="general" component={ ProfileGeneral } />
                    {/* User profile avatar */}
                    <Route path="avatar" component={ ProfileAvatar } />
                    {/* User profile password */}
                    <Route path="password" component={ ProfilePassword } />
                </Route>
            </Route>

            {/* User logout */}
            <Route path="logout" component={ Logout } />
        </Route>

        {/* Routes only for guest users */}
        <Route onEnter={ requireGuest }>
            {/* User registration and email verification */}
            <Route path="registration" component={ RegisterForm } />
            <Route path="registration/success" component={ RegisterSuccess } />
            <Route path="verification" component={ RegisterVerify } />

            {/* User login and password reset */}
            <Route path="login" component={ LoginForm } />
            <Route path="password/reset" component={ PasswordReset } />
        </Route>

        {/* Page not found */}
        <Route path="*" component={ NotFound } />
    </Route>
);
