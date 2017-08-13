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

import { requireAuth, alreadyAuth } from '../app/services/AuthService';

export default (
    <Route path="/" component={ App }>
        <IndexRoute component={ Home } />

        <Route path="vehicles" onEnter={ requireAuth }>
            <IndexRoute component={ Vehicles } />
            <Route path="create" component={ Vehicles } />
            <Route path=":id" component={ VehicleDetails } />
        </Route>

        <Route path="trip" onEnter={ requireAuth }>
            <Route path="create" component={ CreateTrip } />
            <Route path="edit/:id" component={ Vehicles /*TripEdit*/ } />
        </Route>

        <Route path="registration" component={ RegisterForm } onEnter={ alreadyAuth } />
        <Route path="registration/success" component={ RegisterSuccess } onEnter={ alreadyAuth } />
        <Route path="verification" component={ RegisterVerify } onEnter={ alreadyAuth } />

        <Route path="password/reset" component={ PasswordReset } onEnter={ alreadyAuth } />
        <Route path="login" component={ LoginForm } onEnter={ alreadyAuth } />
        <Route path="logout" component={ Logout } onEnter={ requireAuth } />

        <Route path="*" component={ NotFound } />
    </Route>
);
