//import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import Store from './store';
import routes from './routes';

render(
    (<Provider store={ Store }>
        <Router history={ browserHistory }>
            { routes }
        </Router>
    </Provider>)
    , document.getElementById('bebeep-app')
)
