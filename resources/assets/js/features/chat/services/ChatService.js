import { securedRequest } from 'app/services/RequestService';

const ChatService = {

    deleteMessage(id) {
        const request = `/api/v1/users/message/${id}`;
        return securedRequest.delete(request)
            .then(
                response => response
            )

    }
};

export default ChatService;
