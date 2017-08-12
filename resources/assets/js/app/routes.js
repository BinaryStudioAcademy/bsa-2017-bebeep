import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import App from './App';
import Home from './layouts/Home';
import Vehicles from '../features/vehicle/layouts/Vehicles';
import VehicleDetails from '../features/vehicle/layouts/VehicleDetails';
import NotFound from './layouts/NotFound';
import RegisterForm from '../features/user/layouts/RegisterForm';
import RegisterSuccess from '../features/user/layouts/RegisterSuccess';
import RegisterVerify from '../features/user/layouts/RegisterVerify';
import PasswordForgot from '../features/user/layouts/PasswordForgot';
import PasswordReset from '../features/user/layouts/PasswordReset';
import LoginForm from '../features/user/layouts/Login/LoginForm';
import Logout from '../features/user/layouts/Login/Logout';

export default (
    <Route path="/" component={ App }>
        <IndexRoute component={ Home } />

        <Route path="vehicles" component={ Vehicles } onEnter={ requireAuth }>
            // as example to restrict path for unauthenticated users
            <Route path="vehicles/create" component={ Vehicles } />
        </Route>
        <Route path="vehicles/:id" component={ VehicleDetails } />

        <Route path="registration" component={ RegisterForm } />
        <Route path="registration/success" component={ RegisterSuccess } />
        <Route path="verification" component={ RegisterVerify } />

        <Route path="password/forgot" component={ PasswordForgot } />
        <Route path="password/reset" component={ PasswordReset } />
        <Route path="login" component={ LoginForm } />
        <Route path="logout" component={ Logout } />

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