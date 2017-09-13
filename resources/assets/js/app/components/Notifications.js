import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import BroadcastService from 'app/services/BroadcastService';
import {getMessage, markAsRead} from 'app/services/NotificationService';
import {addNotification, markAsReadNotification} from 'features/notifications/actions';
import Push from 'push.js';
import {browserHistory} from 'react-router';
import { NotificationStack } from 'react-notification';

class Notifications extends React.Component {
    constructor() {
        super();

        this.state = {
            userId: null,
            notifications: []
        };
    }

    componentWillMount() {
        this.setState({userId: this.props.userId});
        this.getNotifications(this.props.userId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userId !== this.state.userId) {
            this.setState({userId: nextProps.userId});
            this.getNotifications(nextProps.userId);
        }
    }

    getNotifications(userId) {
        const {addNotification} = this.props;

        if (userId) {
            BroadcastService.Echo.private('App.User.' + userId)
                .notification((notification) => {
                    const data = Object.assign(notification, {
                        type: BroadcastService.prepareType(notification.type),
                        created_at_x: parseInt(Date.now() / 1000),
                        read: false
                    });

                    addNotification(data);
                    this.showNotification(data);
                })
                .listen('Chat\\NewMessage', (e) => {
                    console.log(e);
                });
        } else {
            BroadcastService.Echo.leave('App.User.' + this.state.userId)
        }
    }

    showNotification(notificationData) {
        const {markAsReadNotification} = this.props,
            messageData = getMessage(notificationData),
            notification = {
                key: notificationData.id,
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
                })(notificationData.id, messageData.link),
            };

        Push.create(notification.title, {
            body: notification.message,
            timeout: notification.timeout,
            onClick: function () {
                notification.onClick();
                window.focus();
                this.close();
            }
        }).catch(() => {
           this.alternativeNotification(notification);
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
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({addNotification, markAsReadNotification}, dispatch)
)(Notifications);
