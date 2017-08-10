import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import App from './App';
import Home from './layouts/Home';
import Vehicles from '../features/vehicle/layouts/Vehicles';
import VehicleDetails from '../features/vehicle/layouts/VehicleDetails';
import NotFound from './layouts/NotFound';
import LoginForm from '../features/user/layouts/Login/LoginForm';
import LoginSuccess from '../features/user/layouts/Login/LoginSuccess.js'

export default (
    <Route path="/" component={ App }>
        <IndexRoute component={ Home } />

        <Route path="vehicles" component={ Vehicles } />
        <Route path="vehicles/:id" component={ VehicleDetails } />

        <Route path="login" component={ LoginForm } />
        <Route path="login/success" component={ LoginSuccess } />

        <Route path="*" component={ NotFound } />
    </Route>
);
