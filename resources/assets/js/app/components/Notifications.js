import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import BroadcastService from 'app/services/BroadcastService';
import {getMessage, markAsRead, NOTIFICATION_CHAT_MESSAGE_RECEIVED} from 'app/services/NotificationService';
import {addNotification, markAsReadNotification} from 'features/notifications/actions';
import {receiveMessage} from 'features/chat/actions';
import Push from 'push.js';
import {browserHistory} from 'react-router';
import { NotificationStack } from 'react-notification';
import {NEW_MESSAGE_EVENT} from 'app/config';

class Notifications extends React.Component {
    constructor() {
        super();

        this.state = {
            notifications: []
        };
    }

    componentWillMount() {
        this.getNotifications(this.props.userId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthorized !== this.props.isAuthorized) {
            nextProps.isAuthorized
                ? this.getNotifications(nextProps.userId)
                : this.disconnectChannel(this.props.userId);
        }
    }

    getNotifications(userId) {
        const {addNotification, receiveMessage} = this.props;

        if (userId) {
            BroadcastService.Echo.private('App.User.' + userId)
                .notification((notification) => {
                    const data = Object.assign(notification, {
                        type: BroadcastService.prepareType(notification.type),
                        created_at_x: parseInt(Date.now() / 1000),
                        read: false
                    });

                    addNotification(data);
                    this.showNotification(this.getNotificationData(data));
                })
                .listen(NEW_MESSAGE_EVENT, (e) => {
                    this.showNotification(this.getMessageData(Object.assign({}, e.data, {
                        type: NOTIFICATION_CHAT_MESSAGE_RECEIVED,
                    })));
                    receiveMessage(e.data);
                });
        }
    }

    disconnectChannel(userId) {
        BroadcastService.Echo.leave('App.User.' + userId)
    }

    getNotificationData(data) {
        const {markAsReadNotification} = this.props,
            messageData = getMessage(data);
        return {
            key: data.id,
            type: messageData.type,
            message: messageData.title,
            title: 'BeBeep',
            timeout: 5000,
            onClick: ((id, link) => () => {
                if (link) {
                    markAsRead(id).then(() => markAsReadNotification(id));
                    browserHistory.push(link);
                } else {
                    browserHistory.push('/dashboard/notifications')
                }
            })(data.id, messageData.link),
        };
    }

    getMessageData(data) {
        const messageData = getMessage(data);
        return {
            key: data.id,
            type: messageData.type,
            message: messageData.message.length > 50
                ? messageData.message.substr(0, 50) + '...'
                : messageData.message,
            title: messageData.title,
            timeout: 5000,
            onClick: ((id, link) => () => {
                if (link) {
                    browserHistory.push(link);
                } else {
                    browserHistory.push('/dashboard/notifications')
                }
            })(data.id, messageData.link),
        };
    }

    showNotification(notification) {
        this.pushNotification(notification).catch(() => {
            this.alternativeNotification(notification);
        });
    }

    pushNotification(notification) {
        return Push.create(notification.title, {
            body: notification.message,
            timeout: notification.timeout,
            onClick: function () {
                notification.onClick();
                window.focus();
                this.close();
            }
        });
    }

    alternativeNotification(notification) {
        this.setState({
            notifications: [
                {
                    key: notification.key,
                    message: notification.message,
                    dismissAfter: notification.timeout,
                    className: 'notification-bar--' + notification.type,
                    barStyle: {
                        left: 'auto',
                        background: null
                    },
                    activeBarStyle: {
                        left: 'auto'
                    },
                    actionStyle: {
                        padding: 0,
                        margin: 0
                    },
                    action: " ",
                    onClick: (data, deactivate) => {
                        notification.onClick();
                        this.hideNotification(data.key);
                        deactivate();
                    }
                },
                ...this.state.notifications
            ]
        });
    }

    hideNotification(key) {
        this.setState({
            notifications: _.filter((notification) => {
                return notification.key !== key;
            })
        });
    }

    render() {
        const {translate} = this.props,
            {notifications} = this.state;

        return (
            <div>
                <NotificationStack
                    notifications={notifications}
                    onDismiss={notification => {
                        this.hideNotification(notification.key);
                    }}
                />
            </div>
        );
    }
}

Notifications.PropTypes = {
    userId: PropTypes.number.isRequired
};

export default connect(
    state => ({
        translate: getTranslate(state.locale),
        userId: state.user.session.user_id,
        isAuthorized: state.user.login.success
    }),
    dispatch => bindActionCreators({addNotification, markAsReadNotification, receiveMessage}, dispatch)
)(Notifications);
