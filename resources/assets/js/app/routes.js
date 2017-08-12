import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import App from './App';
import Home from './layouts/Home';
import NotFound from './layouts/NotFound';

import Dashboard from '../features/user/layouts/Dashboard';
import UserProfile from '../features/user/layouts/UserProfile';
import { General, Avatar } from '../features/user/layouts/Profile';
import { Password } from '../features/user/layouts/Account';

/* import { Form, Success, Verify } from '../features/user/layouts/Register'; */
/* Put these layouts into Register dir and create index.js in it */
/* like index.js in layouts/Profile */

import CreateTrip from '../features/trip/layouts/CreateTrip';

import RegisterForm from '../features/user/layouts/RegisterForm';
import RegisterSuccess from '../features/user/layouts/RegisterSuccess';
import RegisterVerify from '../features/user/layouts/RegisterVerify';
import PasswordReset from '../features/user/layouts/PasswordReset';
import LoginForm from '../features/user/layouts/Login/LoginForm';
import Logout from '../features/user/layouts/Login/Logout';

import Vehicles from '../features/vehicle/layouts/Vehicles';
import VehicleDetails from '../features/vehicle/layouts/VehicleDetails';

export default (
    <Route path="/" component={ App }>
        <IndexRoute component={ Home } />

        {/* User registration and email verification */}
        <Route path="registration" component={ RegisterForm } />
        <Route path="registration/success" component={ RegisterSuccess } />
        <Route path="verification" component={ RegisterVerify } />

        {/* User login, logout and password reset */}
        <Route path="login" component={ LoginForm } />
        <Route path="logout" component={ Logout } />
        <Route path="password/reset" component={ PasswordReset } />

        {/* User dashboard */}
        <Route path="dashboard" onEnter={ requireAuth }>
            <IndexRoute component={ Dashboard } />

            {/* These routes for user vehicles */}
            <Route path="my-vehicles">
                {/* All user vehicles */}
                <IndexRoute component={ Vehicles /* User vehicles layout */ } />

                {/* User vehicle by id */}
                <Route path=":id" component={ VehicleDetails /* User vehicle edit layout */ } />

                {/* User vehicle create */}
                <Route path="create" component={ Vehicles /* User vehicle create layout */ } />
            </Route>

            {/* These routes for user trips */}
            <Route path="my-trips">
                {/* All user vehicles */}
                <IndexRoute component={ Dashboard /* User trips layout */ } />

                {/* User trip by id */}
                <Route path=":id" component={ Dashboard /* User trip edit layout */ } />
            </Route>

            {/* This route for user bookings */}
            <Route path="my-bookings" component={ Dashboard /* User bookings layout */ } />

            {/* These routes for user profile */}
            <Redirect from='profile' to='profile/general' />

            <Route path="profile" component={ UserProfile }>
                {/* User general profile */}
                <Route path="general" component={ General } />
                {/* User avatar */}
                <Route path="avatar" component={ Avatar } />
                {/* User password change */}
                <Route path="password" component={ Password } />
            </Route>
        </Route>

        {/* This route for trip creating */}
        <Route path="trip/create" component={ CreateTrip } />

        <Route path="*" component={ NotFound } />
    </Route>
);

function requireAuth(nextState, replace) {
    if (!sessionStorage.jwt) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}
