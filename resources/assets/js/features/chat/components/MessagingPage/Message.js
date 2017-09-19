import React from 'react';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import {getProfileAvatar} from 'app/services/PhotoService';
import DateTimeHelper from 'app/helpers/DateTimeHelper';

import {MESSAGE_STATUS_RECIEVED, MESSAGE_STATUS_SENT} from '../../reducer';

class Message extends React.Component {

    renderMsg() {
        const {userData, authUser, messageData, keyId} = this.props;
        let msgClass, user;

        if (messageData.status === MESSAGE_STATUS_RECIEVED) {
           msgClass = 'left';
           user = userData;
        } else if (messageData.status === MESSAGE_STATUS_SENT) {
            msgClass = 'right';
            user = authUser;
        }

        return (
            <li key={keyId} className={"clearfix chat-item " + msgClass}>
                <span className={"chat-img pull-" + msgClass}>
                    <img src={getProfileAvatar(user.avatar)} alt={user.first_name} />
                </span>
                <div className="chat-body clearfix">
                    <div className="header">
                        <strong className="primary-font">{user.first_name}&nbsp;{user.last_name}</strong>
                        <small className="text-muted pull-right">
                            <i className="fa fa-clock-o"></i>&nbsp;{DateTimeHelper.getTimeForChat(messageData.time)}
                        </small>
                    </div>
                    <p>{messageData.text}</p>
                </div>
            </li>
        );
    }

    render() {
        const {translate} = this.props;
        return this.renderMsg();
    }
}

export default connect(
    state => ({
        authUser: state.user.profile,
        translate: getTranslate(state.locale)
    })
)(Message);
