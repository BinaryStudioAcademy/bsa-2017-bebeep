import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import Store from 'app/store';
import routes from 'app/routes';

render(
    (<Provider store={ Store }>
        <Router history={ browserHistory }>
            { routes }
        </Router>
    </Provider>)
    , document.getElementById('bebeep-app')
)
