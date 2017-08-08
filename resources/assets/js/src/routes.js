import React from 'react';
import {IndexRoute, Route} from 'react-router';

import App from './App';
import Home from './pages/Home';
import Users from './pages/Users';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="users" name="users" component={Users} />
    </Route>
);
