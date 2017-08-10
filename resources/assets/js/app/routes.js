import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import App from './App';
import Home from './layouts/Home';
import NotFound from './layouts/NotFound';

import Dashboard from '../features/user/layouts/Dashboard';
import UserProfile from '../features/user/layouts/UserProfile';

import { ProfileForm, ProfileAvatar, AccountPassword } from '../features/user/components/Dashboard';

import RegisterForm from '../features/user/layouts/RegisterForm';
import RegisterSuccess from '../features/user/layouts/RegisterSuccess';
import RegisterVerify from '../features/user/layouts/RegisterVerify';

import Vehicles from '../features/vehicle/layouts/Vehicles';
import VehicleDetails from '../features/vehicle/layouts/VehicleDetails';

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

            {/* This route for user cars */}
            <Route path="my-cars" component={ Dashboard /*User Cars layout*/ } />

            {/* This route for user trips */}
            <Route path="my-trips" component={ Dashboard /*User Trips layout */ } />

            {/* This route for user bookings */}
            <Route path="my-bookings" component={ Dashboard /*User Bookings layout*/ } />

            {/* User profile */}
            <Redirect from='profile' to='profile/general' />
            <Route path="profile" component={ UserProfile }>

                <Route path="general" component={ ProfileForm } />
                <Route path="avatar" component={ ProfileAvatar } />
                <Route path="password" component={ AccountPassword } />

                {/*<Route path="preferences" component={ UserPreferences } />*/}
            </Route>
        </Route>

        <Route path="*" component={ NotFound } />
    </Route>
);
