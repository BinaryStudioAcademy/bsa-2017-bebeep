import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import App from './App';
import Home from './layouts/Home';
import Vehicles from '../features/vehicle/layouts/Vehicles';
import VehicleDetails from '../features/vehicle/layouts/VehicleDetails';
import VehicleForm from '../features/vehicle/layouts/VehicleForm';
import NotFound from './layouts/NotFound';

export default (
    <Route path="/" component={ App }>
        <IndexRoute component={ Home } />

        <Route path="vehicles" component={ Vehicles } />
        <Route path="vehicles/:id" component={ VehicleDetails } />
        <Route path="mycars" component={ VehicleForm } />

        <Route path="*" component={ NotFound } />
    </Route>
);
