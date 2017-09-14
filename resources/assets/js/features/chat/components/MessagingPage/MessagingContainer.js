import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import {Link} from 'react-router';
import MessageList from './MessageList';

import '../../styles/messaging-page.scss';

class MessagingContainer extends React.Component {

    getMessagesData(id) {
        const {messagesArr} = this.props;
        return messagesArr.byId[id];
    }

    getUsersData(id) {
        const {usersArr} = this.props;
        return Object.assign({}, usersArr.byId[id]);
    }

    render() {
        const {translate, userId} = this.props,
            backLink = '/dashboard/users',
            messages = this.getMessagesData(userId),
            user = this.getUsersData(userId);

        return (
            <div className="col-md-10 offset-md-1">
                <div className="row">
                    <div className="chat-message">
                        <div className="chat-message__header">
                            <Link to={backLink} activeClassName="active">
                                <i className="fa fa-chevron-left chat-message__header-chat-back" aria-hidden="true"></i>
                                <span className="chat-message__header-chat-back chat-message__header-chat-back-btn">
                                    {translate('chat.back_btn')}
                                </span>
                            </Link>
                            <span className="pull-right chat-message__header-user-name">{user.first_name}&nbsp;{user.last_name}</span>
                        </div>
                        <div className="chat-message__body">
                            <MessageList messages={messages} user={user} />
                        </div>
                        <div className="chat-message__footer">
                            <div className="input-group">
                                <input className="form-control border no-shadow chat-message__footer-input" placeholder={translate('chat.type_msg')}/>
                                <button className="btn btn-success hover chat-message__footer-send-btn" type="button">{translate('chat.send_btn')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
    }
}

export default connect(
    state => ({
        messagesArr: state.chat.entities.messages,
        usersArr: state.chat.entities.users,
        translate: getTranslate(state.locale)
    })
)(MessagingContainer);
