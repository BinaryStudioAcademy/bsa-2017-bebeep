import {securedRequest} from './RequestService'

const ChatService = (() => {

    return {
        getOthersUser() {
            return securedRequest.get('/api/v1/users/others');
        }
    };
})();

export default ChatService;
