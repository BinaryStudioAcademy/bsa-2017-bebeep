import * as actions from './actionTypes';

const tripsData = [
    {from:['a','b'], to:['c','d'], brand: 'Car', model: '1', start_at:'20:10 09.08.2017', end_at:'22:10 09.08.2017'},
    {from:['e','f'], to:['g','h'], brand: 'Car', model: '2', start_at:'20:10 09.08.2017', end_at:'22:10 09.08.2017'}
];

export function getTrips() {
    return {
        type: actions.TRIPSLIST_GET_ALL,
        trips: tripsData,
    };
};