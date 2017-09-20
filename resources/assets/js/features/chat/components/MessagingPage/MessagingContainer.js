import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import {Link} from 'react-router';
import MessageList from './MessageList';
import {getProfileAvatar} from 'app/services/PhotoService';
import {sendMessage, getMessagesByUser, addUser} from 'features/chat/actions';
import {
    checkDriverRole,
    checkPassengerRole
} from 'app/services/UserService';
import _ from 'lodash';
import moment from 'moment';

import 'features/chat/styles/messaging-page.scss';

const BACK_LINK = '/dashboard/users';

class MessagingContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            msgSending: false,
        };

        this.onSendMsg = this.onSendMsg.bind(this);
    }

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
    }

    getChats(id) {
        const {chats} = this.props;

        return chats.byUserId[id] || [];
    }

    getUsersData(id) {
        const {usersArr, addUser} = this.props,
            userData = Object.assign({}, usersArr.byId[id]);

        if (_.isEmpty(userData)) {
            addUser(id);
        }
        userData.avatar = getProfileAvatar(userData.avatar);

        return userData;
    }

    onSendMsg(e) {
        e.preventDefault();

        const _this = this;

        _this.setState({
            msgSending: true,
        });

        const {userId, sendMessage} = _this.props,
            form = e.target,
            text = form.text.value;

        const data = {
            userId,
            text,
            time: moment().unix(),
        };

        sendMessage(data);

        form.text.value = '';

        setTimeout(() => {
            _this.setState({
                msgSending: false,
            });
        }, 400);
    }

    checkOnlineStatus() {
        const { onlineUsers, userId } = this.props,
            user = this.getUsersData(userId);

        return !!_.find(onlineUsers, (onlineUser) => {
            return onlineUser.id === user.id;
        });
    }

    renderStatusOnline() {
        return this.checkOnlineStatus()
            ? <span className="chat-message__header-user-status-online" />
            : null;
    }

    render() {
        const {translate, userId} = this.props,
            messages = this.getChats(userId),
            user = this.getUsersData(userId),
            btnSendActiveClass = this.state.msgSending
                ? 'chat-message__footer-send-btn--sending'
                : '';

        let link = '';

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
                            <Link to={BACK_LINK} className="chat-message__header-chat-back">
                                <i className="fa fa-chevron-left mr-2"
                                    aria-hidden="true" />
                                <span className="chat-message__header-chat-back-btn">
                                    {translate('chat.back_btn')}
                                </span>
                            </Link>
                            <Link to={link} className="chat-message__header-user-name-container">
                                <div className="chat-message__header-user-avatar-container">
                                    <img src={user.avatar}
                                        alt=""
                                        className="chat-message__header-user-avatar"
                                    />
                                    {this.renderStatusOnline()}
                                </div>
                                <span>{user.first_name}&nbsp;{user.last_name}</span>
                            </Link>
                        </div>

                        <div className="chat-message__body" >
                            <MessageList
                                messages={messages}
                                user={user}
                                userId={userId}
                            />
                        </div>

                        <div className="chat-message__footer">
                            <form role="form" method="POST" onSubmit={this.onSendMsg}>
                                <div className="input-group">
                                    <input id="text"
                                        name="text"
                                        className="form-control border no-shadow chat-message__footer-input"
                                        placeholder={translate('chat.type_msg')}
                                        required
                                    />
                                    <button type="submit"
                                        role="button"
                                        className={"btn btn-success chat-message__footer-send-btn " +
                                            btnSendActiveClass}
                                    >
                                        <i className="fa fa-paper-plane-o chat-message__footer-send-btn-icon" aria-hidden="true" />
                                    </button>
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
        onlineUsers: state.chat.onlineUsers,
        translate: getTranslate(state.locale),
    }),
    dispatch => (bindActionCreators({sendMessage, getMessagesByUser, addUser}, dispatch))
)(MessagingContainer);
