import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {getTranslate} from 'react-localize-redux';
import Message from './Message'

class MessageList extends React.Component {

    render() {
        const {translate, messages, user} = this.props;

        return (
            <ul className="chat" key={moment()}>
                 {messages.map((message, i) => {
                     return (
                         <Message keyId={i} messageData={message} userData={user}/>
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
