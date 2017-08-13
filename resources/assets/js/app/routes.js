import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import App from './App';
import Home from './layouts/Home';
import Vehicles from '../features/vehicle/layouts/Vehicles';
import VehicleDetails from '../features/vehicle/layouts/VehicleDetails';
import NotFound from './layouts/NotFound';
import CreateTrip from '../features/trip/layouts/CreateTrip';
import RegisterForm from '../features/user/layouts/RegisterForm';
import RegisterSuccess from '../features/user/layouts/RegisterSuccess';
import RegisterVerify from '../features/user/layouts/RegisterVerify';
import PasswordReset from '../features/user/layouts/PasswordReset';
import LoginForm from '../features/user/layouts/Login/LoginForm';
import Logout from '../features/user/layouts/Login/Logout';

import { requireAuth, requireGuest } from '../app/services/AuthService';

export default (
    <Route path="/" component={ App }>
        <IndexRoute component={ Home } />

        <Route onEnter={ requireAuth }>
            <Route path="vehicles">
                <IndexRoute component={ Vehicles } />
                <Route path="create" component={ Vehicles } />
                <Route path=":id" component={ VehicleDetails } />
            </Route>

            <Route path="trip">
                <Route path="create" component={ CreateTrip } />
                <Route path="edit/:id" component={ Vehicles /*TripEdit*/ } />
            </Route>

            <Route path="logout" component={ Logout } />
        </Route>

        <Route onEnter={ requireGuest }>
            <Route path="registration" component={ RegisterForm } />
            <Route path="registration/success" component={ RegisterSuccess } />
            <Route path="verification" component={ RegisterVerify } />

            <Route path="login" component={ LoginForm } />
            <Route path="password/reset" component={ PasswordReset } />
        </Route>

        <Route path="*" component={ NotFound } />
    </Route>
);
