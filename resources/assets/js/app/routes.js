import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import App from './App';
import Home from './views/Home';
import Vehicles from '../features/vehicle/views/Vehicles';
import VehicleOne from '../features/vehicle/views/VehicleOne';
import NotFound from './views/NotFound';

export default (
    <Route path="/" component={ App }>
        <IndexRoute component={ Home } />

        <Route path="vehicles" component={ Vehicles } />
        <Route path="vehicles/:id" component={ VehicleOne } />

        <Route path="*" component={ NotFound } />
    </Route>
);
