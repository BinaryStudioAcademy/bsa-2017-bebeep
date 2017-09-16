import { securedRequest } from 'app/services/RequestService';

const ChatService = {

    deleteMessage(id) {
        const request = `/api/v1/users/message/${id}`;
        return securedRequest.delete(request)
            .then(
                response => Promise.resolve(response),
                error => Promise.reject(error.response.data)
            )
    }
};

export default ChatService;
