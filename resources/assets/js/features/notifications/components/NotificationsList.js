import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import {getNotifications, getMessage} from 'app/services/NotificationService';
import {setNotifications} from '../actions'
import { ListGroup, ListGroupItem } from 'reactstrap';
import Notification from './Notifications/Notification';

class NotificationsList extends React.Component {

    componentWillMount() {
        const {setNotifications} = this.props;

        getNotifications()
            .then(response => setNotifications(response.data.data));
    }

    render() {
        const {translate, notificationList, notifications} = this.props;

        return (
            <ListGroup>
                    {notificationList.map((id) => {
                        const notification = notifications.byId[id],
                            message = getMessage(notification);

                        return (
                            <ListGroupItem key={id} className="notification-item">
                                <Notification
                                    read={notification.read}
                                    notificationId={notification.id}
                                    date={notification.created_at_x}
                                    title={message.title}
                                    type={message.type}
                                >
                                    <div>{message.message}</div>
                                    {
                                        message.link
                                            ? <a className="btn" href={message.link}>
                                                {translate('notifications.messages.detail')}
                                            </a>
                                            : ''
                                    }
                                </Notification>
                            </ListGroupItem>
                        );
                    })}
            </ListGroup>
        );
    }
}

export default connect(
    state => ({
        notificationList: state.notifications.notifications,
        notifications: state.notifications.entities.notifications,
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({setNotifications}, dispatch)
)(NotificationsList);
