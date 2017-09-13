import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import AuthService from './AuthService';
import { PUSHER_API_KEY } from 'app/config.js';

const BroadcastService = (() => {
    const _Echo = new Echo({
            broadcaster: 'pusher',
            key: PUSHER_API_KEY,
            cluster: 'eu',
            encrypted: true,
            auth: {}
        });

    return {
        get Echo() {
            if (AuthService.isAuthorized()) {
                _Echo.connector.setOptions({
                    auth: {
                        headers: {
                            Authorization: 'Bearer ' + AuthService.getSessionToken()
                        }
                    }
                });
                _Echo.connector.connect();
            }

            return _Echo;
        },
        prepareType(type) {
            const newType = type.match(/\\([a-zA-Z]+)$/);

            if (newType === null) {
                return type;
            }

            return newType[1].replace(/([A-Z]+)/g, "_$&").toLowerCase().slice(1);
        }
    };
})();

export default BroadcastService;
