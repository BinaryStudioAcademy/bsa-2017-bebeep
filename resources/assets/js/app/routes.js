import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import App from './App';
import Home from './layouts/Home';
import NotFound from './layouts/NotFound';

import Dashboard from '../features/user/layouts/Dashboard';
import UserProfile from '../features/user/layouts/UserProfile';
import UserProfileForm from '../features/user/components/UserProfileForm';
import UserAvatar from '../features/user/components/UserAvatar';

import Vehicles from '../features/vehicle/layouts/Vehicles';
import VehicleDetails from '../features/vehicle/layouts/VehicleDetails';

import RegisterForm from '../features/user/layouts/RegisterForm';
import RegisterSuccess from '../features/user/layouts/RegisterSuccess';
import RegisterVerify from '../features/user/layouts/RegisterVerify';

export default (
    <Route path="/" component={ App }>
        <IndexRoute component={ Home } />

        {/* Test routes */}
        <Route path="vehicles" component={ Vehicles } />
        <Route path="vehicles/:id" component={ VehicleDetails } />

        {/* User registration and email verification */}
        <Route path="registration" component={ RegisterForm } />
        <Route path="registration/success" component={ RegisterSuccess } />
        <Route path="verification" component={ RegisterVerify } />

        {/* User dashboard */}
        <Route path="dashboard">
            <IndexRoute component={ Dashboard } />

            {/* This route for user trips */}
            <Route path="my-trips" component={ Dashboard /*Trips layout */ } />

            {/* This route for user bookings */}
            <Route path="my-bookings" component={ Dashboard /*Bookings layout*/ } />

            {/* User profile */}
            <Redirect from='profile' to='profile/general' />
            <Route path="profile" component={ UserProfile }>

                <Route path="general" component={ UserProfileForm } />
                <Route path="avatar" component={ UserAvatar } />

                {/*<Route path="preferences" component={ UserPreferences } />
                <Route path="password" component={ UserPassword } />*/}
            </Route>
        </Route>

        <Route path="*" component={ NotFound } />
    </Route>
);
