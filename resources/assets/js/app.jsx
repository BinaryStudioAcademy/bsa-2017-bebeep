import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {IndexRoute, Route, Router, browserHistory} from 'react-router';

import App from './src/App';
import Home from './src/pages/Home';
import Users from './src/pages/Users';

import store from './src/store';

render(
    (<Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path="users" name="users" component={Users} />
            </Route>
        </Router>
    </Provider>)
    , document.getElementById('app')
)
