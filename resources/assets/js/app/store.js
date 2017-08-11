import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reducer from './reducer';

const middleware = process.env.NODE_ENV === 'production' ?
    [ thunk ] :
    [ thunk, logger() ];

export default createStore(
    reducer,
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    applyMiddleware(...middleware)
);
