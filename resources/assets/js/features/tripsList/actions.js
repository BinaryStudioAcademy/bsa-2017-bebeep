import * as actions from './actionTypes';
import axios from 'axios';

const tripsData = [
    {id: 1,from:['a','b'], to:['c','d'], brand: 'Car1', model: '1', start_at:'2017-08-10 12:21:31', end_at:'2017-08-10 14:21:31'},
    {id: 2,from:['a','b'], to:['c','d'], brand: 'Car2', model: '1', start_at:'2017-08-10 12:21:31', end_at:'2017-08-10 14:21:31'},
    {id: 3,from:['a','b'], to:['c','d'], brand: 'Car3', model: '2', start_at:'2017-08-10 08:21:31', end_at:'2017-08-10 09:21:31'},
    {id: 5,from:['a','b'], to:['c','d'], brand: 'Car3', model: '2', start_at:'2017-09-10 08:21:31', end_at:'2017-08-10 09:21:31'},
    {id: 4,from:['e','f'], to:['g','h'], brand: 'Car4', model: '2', start_at:'2017-08-10 08:21:31', end_at:'2017-08-10 09:21:31'}
];

const user_id = 1;

export function getTrips() {
    axios.post('api/driver?user_id='+user_id)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    return {
        type: actions.TRIPSLIST_GET_ALL,
        trips: tripsData
    };
};

export function filterPast() {
    return {
        type: actions.TRIPSLIST_FILTER_PAST,
        trips: tripsData
    };
};

export function filterUpcoming() {
    return {
        type: actions.TRIPSLIST_FILTER_UPCOMING,
        trips: tripsData
    };
};