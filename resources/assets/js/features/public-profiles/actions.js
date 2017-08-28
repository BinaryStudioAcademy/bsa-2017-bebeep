import * as actions from './actionTypes';
import { securedRequest } from 'app/services/RequestService';

export const publicDriverProfileSetState = profile => ({
    type: actions.PUBLIC_PROFILE_SET_STATE,
    profile
});

export const getProfile = (id) => dispatch => {
        let response = {
                first_name: 'Andrey',
                last_name: 'Tondrev',
                birth_date: '1995-11-12',
                about_me: 'Creative guy. Work in film and TV. From Manchester and now based between there and London, and often driving between the two',
                img: null,
                car: {
                    model: 'BMW X5',
                    color: 'blue',
                    photo: null
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
        dispatch(publicDriverProfileSetState(response));

        /*return securedRequest.get('/api/v1/driver/' + id)
         .then(response => {
            response =  Promise.resolve(response.data);
            dispatch(publicDriverProfileSetState(response.data))
         });*/

};
