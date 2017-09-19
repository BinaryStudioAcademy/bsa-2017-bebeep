import React from 'react';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import {getProfileAvatar} from 'app/services/PhotoService';
import DateTimeHelper from 'app/helpers/DateTimeHelper';

import {MESSAGE_STATUS_RECIEVED, MESSAGE_STATUS_SENT} from '../../reducer';

class Message extends React.Component {

    renderMsg() {
        const {userData, authUser, messageData, keyId, onDeleteMessage} = this.props;
        let msgClass, user, trashClass;

        if (messageData.status === MESSAGE_STATUS_RECIEVED) {
            msgClass = 'left';
            user = userData;
            trashClass = 'message-body-trash-icon-no-display';
        } else if (messageData.status === MESSAGE_STATUS_SENT) {
            msgClass = 'right';
            user = authUser;
            trashClass = '';
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
                     <div className="message-body">
                         <div className="row">
                             <div className="col-md-11"><p>{messageData.text}</p></div>
                             <div className="col-md-1">
                                 <i className={"fa fa-trash-o message-body-trash-icon " + trashClass} onClick={ onDeleteMessage }></i>
                             </div>
                         </div>
                     </div>
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
