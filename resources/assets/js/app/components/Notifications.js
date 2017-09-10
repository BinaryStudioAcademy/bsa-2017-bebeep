import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import BroadcastService from 'app/services/BroadcastService';
import {getMessage} from 'app/services/NotificationService';
import {addNotification} from 'features/notifications/actions';
import Push from 'push.js';
import {browserHistory} from 'react-router';

class Notifications extends React.Component {
    constructor() {
        super();
    }

    componentWillMount() {
        this.getNotifications(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userId !== this.props.userId) {
            this.getNotifications(nextProps);
        }
    }

    getNotifications(props) {
        const {addNotification, userId} = props;

        if (userId > 0) {
            BroadcastService.Echo.private('App.User.' + userId)
                .notification((notification) => {
                    const data = Object.assign(notification, {
                        type: BroadcastService.prepareType(notification.type),
                        created_at_x: parseInt(Date.now() / 1000),
                        read: false
                    });

                    addNotification(data);
                    this.showNotification(data);
                });
        }
    }

    showNotification(notification) {
        const messageData = getMessage(notification);

        Push.create("BeBeep", {
            body: messageData.title,
            timeout: 4000,
            onClick: function () {
                browserHistory.push('/dashboard/notifications');
                window.focus();
                this.close();
            }
        }).catch(() => {
            console.info(messageData);
        });
    }

    render() {
        const {translate} = this.props;

        return (
            <div>

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
    dispatch => bindActionCreators({addNotification}, dispatch)
)(Notifications);

