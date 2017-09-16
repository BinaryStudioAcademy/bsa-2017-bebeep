import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {getTranslate} from 'react-localize-redux';
import Message from './Message'

class MessageList extends React.Component {

    moveToBottom() {
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }
    componentDidMount() {
        this.moveToBottom();
    }

    componentDidUpdate() {
        this.moveToBottom();
    }

    render() {
        const {translate, messages, user, onDelete} = this.props;

        return (
            <ul className="chat" key={moment()} ref={(container) => this.chatContainer = container}>
                 {messages.map((message, i) => {
                     return (
                         <Message
                             key={i}
                             keyId={i}
                             messageData={message}
                             userData={user}
                             onDeleteMessage={ onDelete(message.id) }
                         />
                     );
                 })}
            </ul>
        );
    }
}

export default connect(
    state => ({
        translate: getTranslate(state.locale)
    })
)(MessageList);
