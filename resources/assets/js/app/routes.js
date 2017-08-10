import React from 'react';
import { IndexRoute, Route, Redirect } from 'react-router';

import App from 'app/App';
import Home from 'app/layouts/Home';
import Vehicles from 'features/vehicle/layouts/Vehicles';
import VehicleDetails from 'features/vehicle/layouts/VehicleDetails';
import NotFound from 'app/layouts/NotFound';
import RegisterForm from 'features/user/layouts/RegisterForm';
import RegisterSuccess from 'features/user/layouts/RegisterSuccess';
import RegisterVerify from 'features/user/layouts/RegisterVerify';

export default (
    <Route path="/" component={ App }>
        <IndexRoute component={ Home } />

        <Route path="vehicles" component={ Vehicles } />
        <Route path="vehicles/:id" component={ VehicleDetails } />

        <Route path="registration" component={ RegisterForm } />
        <Route path="registration/success" component={ RegisterSuccess } />
        <Route path="verification" component={ RegisterVerify } />

        <Route path="*" component={ NotFound } />
    </Route>
);
