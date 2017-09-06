import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import {getNotifications} from 'app/services/NotificationService';
import LangService from 'app/services/LangService';
import {setNotifications} from '../actions'
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import Notification from './Notifications/Notification';
import DateTimeHelper from 'app/helpers/DateTimeHelper'

class NotificationsList extends React.Component {

    componentWillMount() {
        const {setNotifications} = this.props;

        getNotifications()
            .then(response => setNotifications(response.data.data));
    }

    getMessage(notification) {
        const {translate} = this.props;

        switch (notification.type) {
            case "booking_approved":
                return {
                    type: 'success',
                    title: translate(`notifications.messages.${notification.type}.title`),
                    message: translate(`notifications.messages.${notification.type}.message`, {
                        'first_name': notification.data.driver.first_name,
                        'last_name': notification.data.driver.last_name,
                        'from': notification.data.routes.from,
                        'to': notification.data.routes.to,
                        'start_at': DateTimeHelper.dateFormat(notification.data.trip.start_at, {
                            onlyDate: true,
                            dateFormat: 'MM.DD.YYYY'
                        }).date})
                };
            case "booking_canceled":
                return {
                    type: 'danger',
                    title: translate(`notifications.messages.${notification.type}.title`),
                    message: translate(`notifications.messages.${notification.type}.message`, {
                        'first_name': notification.data.user.first_name,
                        'last_name': notification.data.user.last_name,
                        'from': notification.data.routes.from,
                        'to': notification.data.routes.to,
                        'start_at': DateTimeHelper.dateFormat(notification.data.trip.start_at, {
                            onlyDate: true,
                            dateFormat: 'MM.DD.YYYY'
                        }).date})
                };
            case "booking_declined":
                return {
                    type: 'danger',
                    title: translate(`notifications.messages.${notification.type}.title`),
                    message: translate(`notifications.messages.${notification.type}.message`, {
                        'first_name': notification.data.driver.first_name,
                        'last_name': notification.data.driver.last_name,
                        'from': notification.data.routes.from,
                        'to': notification.data.routes.to,
                        'start_at': DateTimeHelper.dateFormat(notification.data.trip.start_at, {
                            onlyDate: true,
                            dateFormat: 'MM.DD.YYYY'
                        }).date})
                };
            case "booking_created":
                return {
                    type: 'warning',
                    title: translate(`notifications.messages.${notification.type}.title`),
                    message: [(<div key="1">{
                        translate(`notifications.messages.${notification.type}.message${LangService.getNumberForm(notification.data.booking.seats)}`, {
                            'first_name': notification.data.user.first_name,
                            'last_name': notification.data.user.last_name,
                            'seats': notification.data.booking.seats,
                            'from': notification.data.routes.from,
                            'to': notification.data.routes.to,
                            'start_at': DateTimeHelper.dateFormat(notification.data.trip.start_at, {
                                onlyDate: true,
                                dateFormat: 'MM.DD.YYYY'
                            }).date
                        })}</div>), (<a key="2" className="btn" href={`/trips/?booking_trip=${notification.data.trip.trip_id}`}>
                            {translate('notifications.messages.detail')}
                        </a>)]
                };
            case "review_on_trip_created":
                return {
                    type: 'info',
                    title: translate(`notifications.messages.${notification.type}.title`),
                    message: translate(`notifications.messages.${notification.type}.message`, {
                        first_name: notification.data['review']['user']['first_name'],
                        last_name: notification.data['review']['user']['last_name'],
                        from: notification.data['trip']['from'],
                        to: notification.data['trip']['to'],
                    })
                };
            default:
                return {
                    type: '',
                    title: '',
                    message: '',
                };
        }
    }

    render() {
        const {translate, notificationList, notifications} = this.props;

        return (
            <ListGroup>
                    {notificationList.map((id) => {
                        const notification = notifications.byId[id],
                            message = this.getMessage(notification);

                        return (
                            <ListGroupItem key={id} className="notification-item">
                                <Notification
                                    read={notification.read}
                                    notificationId={notification.id}
                                    date={notification.created_at_x}
                                    title={message.title}
                                    type={message.type}
                                >{message.message}</Notification>
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
