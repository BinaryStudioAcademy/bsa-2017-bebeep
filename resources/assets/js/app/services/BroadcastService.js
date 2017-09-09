import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import {getAuthToken} from './AuthService';

const PUSHER_KEY = '93ab4ad70ab16afc1f6d';

const BroadcastService = {
    Echo: new Echo({
        broadcaster: 'pusher',
        key: PUSHER_KEY,
        cluster: 'eu',
        encrypted: true,
        auth: {
            headers: {
                'Authorization': 'Bearer ' + getAuthToken()
            }
        }
    }),

    prepareType(type) {
        const newType = type.match(/\\([a-zA-Z]+)$/);

        if (newType === null) {
            return type;
        }

        return newType[1].replace(/([A-Z]+)/g, "_$&").toLowerCase().slice(1);
    }
};

export default BroadcastService;
