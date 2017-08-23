import { securedRequest } from 'app/services/RequestService';
import moment from 'moment';

const DriverProfileService = {
    getDriverProfile(id) {
        let response;
        return response = {
                first_name: 'Andrey',
                last_name: 'Tondrev',
                birth_date: '1995-11-12',
                about_me: 'Creative guy. Work in film and TV. From Manchester and now based between there and London, and often driving between the two. Any requests, just ask!',
                img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRbezqZpEuwGSvitKy3wrwnth5kysKdRqBW54cAszm_wiutku3R',
                comments: [
                    {
                        id: 1,
                        date: '2017-08-19',
                        user: 'John Ducky',
                        user_img: 'https://s-media-cache-ak0.pinimg.com/736x/a6/b6/90/a6b69091b0a020ce52af8babd42b9929--hairstyles-for-round-faces-best-hairstyles.jpg',
                        text: 'Great driver!',
                        rating: 4
                    },
                    {
                        id: 2,
                        date: '2017-08-19',
                        user: 'Kevin Prince',
                        user_img: 'http://static4.businessinsider.com/image/55b0ead86da811bc52309d7f-100-100/ben-gilbert.jpg',
                        text: 'Nice and safety, thanks!',
                        rating: 5
                    }
                ]
            };
        /*return securedRequest.get('/api/v1/driver/' + id)
            .then(
                response => Promise.resolve(response.data),
                error => Promise.reject(error.response.data)
            );*/
    },
    getTimeFromDate(date, get) {
        return moment().diff(date, get);
    }
};

export default DriverProfileService;
