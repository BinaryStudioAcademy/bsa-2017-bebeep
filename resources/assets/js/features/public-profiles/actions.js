import * as actions from './actionTypes';
import { simpleRequest } from 'app/services/RequestService';

export const publicDriverProfileSetState = profile => ({
    type: actions.PUBLIC_DRIVER_PROFILE_SET_STATE,
    profile
});

export const publicPassengerProfileSetState = profile => ({
    type: actions.PUBLIC_PASSENGER_PROFILE_SET_STATE,
    profile
});

export const publicPassengerProfileSetRequestStatus = (status) => ({
    type: actions.PUBLIC_PASSENGER_PROFILE_SET_REQUEST_STATUS,
    status
});

export const getDriverProfile = (id) => dispatch => {
    let response = {
        first_name: 'Andrey',
        last_name: 'Tondrev',
        birth_date: '1995-11-12',
        about_me: 'Creative guy. Work in film and TV. From Manchester and now based between there and London, and often driving between the two',
        img: null,
        car: {
            model: 'BMW X5',
            color: 'blue',
            img: null
        },
        comments: [
            {
                id: 1,
                date: '2017-08-17',
                user: 'John Ducky',
                user_img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/b6/90/a6b69091b0a020ce52af8babd42b9929--hairstyles-for-round-faces-best-hairstyles.jpg',
                text: 'Great driver!',
                rating: 4
            },
            {
                id: 2,
                date: '2017-08-22',
                user: 'Kevin Prince',
                user_img: null,
                text: 'Nice and safety, thanks!',
                rating: 5
            }
        ]
    };

    //dispatch(publicDriverProfileSetState(response));
};

export const getPassengerProfile = (id) => dispatch => {
    dispatch(publicPassengerProfileSetRequestStatus(false));
    let response = {
        first_name: 'Tomas',
        last_name: 'Witsel',
        birth_date: '1988-11-11',
        about_me: null,
        img: 'http://static5.businessinsider.com/image/564f9a296bb3f7fd52624841-100-100/dennis-green.jpg'
    };
    dispatch(publicPassengerProfileSetState(response));
    dispatch(publicPassengerProfileSetRequestStatus(true));

    /*return securedRequest.get('/api/v1/passenger/' + id)
     .then(response => {
     response =  Promise.resolve(response.data);
     dispatch(publicPassengerProfileSetState(response.data))
     });*/

};
