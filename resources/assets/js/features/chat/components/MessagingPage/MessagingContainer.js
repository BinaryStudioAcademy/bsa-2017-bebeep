import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import {Link} from 'react-router';
import MessageList from './MessageList';
import {sendMessage, getMessagesByUser, addUser} from '../../actions';
import {
    checkDriverRole,
    checkPassengerRole
} from 'app/services/UserService';
import moment from 'moment';

import '../../styles/messaging-page.scss';

class MessagingContainer extends React.Component {

    componentWillMount() {
        this.updateMessages(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userId !== this.props.userId) {
            this.updateMessages(nextProps);
        }
    }

    updateMessages(props) {
        const {getMessagesByUser, userId} = props;

        getMessagesByUser(userId);
        console.log('messages updated');
    }

    getChats(id) {
        const {chats} = this.props;
        return chats.byUserId[id] || [];
    }

    getUsersData(id) {
        const {usersArr, addUser} = this.props,
            userData = Object.assign({}, usersArr.byId[id]);

        if (_.isEmpty(userData)) {
            addUser(id)
        }
        return userData;
    }

    onSendMsg(e) {
        e.preventDefault();
        const {sendMessage} = this.props,
            text = e.target['text'].value;

        let data = {
            userId: this.props.userId,
            text: text,
            time: moment().unix()
        };

        sendMessage(data);
        e.target['text'].value = '';
    }

    render() {
        let link;
        const {translate, userId} = this.props,
            backLink = '/dashboard/users',
            messages = this.getChats(userId),
            user = this.getUsersData(userId);

        if (checkPassengerRole(user.permissions)) {
            link = `/passenger/${user.id}`;
        } else if (checkDriverRole(user.permissions)) {
            link = `/driver/${user.id}`;
        }

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
                            <span className="pull-right chat-message__header-user-name">
                                <Link to={link} >
                                    {user.first_name}&nbsp;{user.last_name}
                                </Link>
                            </span>
                        </div>
                        <div className="chat-message__body" >
                            <MessageList
                                messages={messages}
                                user={user}
                            />
                        </div>
                        <div className="chat-message__footer">
                            <form role="form" method="POST" onSubmit={this.onSendMsg.bind(this)}>
                                <div className="input-group">
                                    <input id="text" name="text" className="form-control border no-shadow chat-message__footer-input" placeholder={translate('chat.type_msg')} required/>
                                    <button className="btn btn-success hover chat-message__footer-send-btn" type="submit">{translate('chat.send_btn')}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            );
    }
}

export default connect(
    state => ({
        chats: state.chat.entities.chats,
        usersArr: state.chat.entities.users,
        translate: getTranslate(state.locale)
    }),
    dispatch => (bindActionCreators({sendMessage, getMessagesByUser, addUser}, dispatch))
)(MessagingContainer);
