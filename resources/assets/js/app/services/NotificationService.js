import React from 'react';
import {securedRequest} from './RequestService';
import LangService from './LangService';
import DateTimeHelper from 'app/helpers/DateTimeHelper'

export const NOTIFICATION_BOOKING_APPROVED = 'booking_approved';
export const NOTIFICATION_BOOKING_CANCELED = 'booking_canceled';
export const NOTIFICATION_BOOKING_DECLINED = 'booking_declined';
export const NOTIFICATION_BOOKING_CREATED = 'booking_created';
export const NOTIFICATION_REVIEW_ON_TRIP_CREATED = 'review_on_trip_created';

export const getNotifications = () => {
    return securedRequest.get('/api/v1/notifications');
};

export const markAsRead = (id) => {
    return securedRequest.put(`/api/v1/notifications/${id}/status`, {
        status: "read"
    });
};

export const getCountUnread = () => {
    return securedRequest.get('/api/v1/notifications/unread/count');
};

export const getMessage = (notification) => {
    const translate = LangService.translate;

    switch (notification.type) {
        case NOTIFICATION_BOOKING_APPROVED:
            return {
                type: 'success',
                title: translate(
                    `notifications.messages.${notification.type}.title`, {
                        'from': notification.data.routes.from,
                        'to': notification.data.routes.to,
                    }
                ),
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
        case NOTIFICATION_BOOKING_CANCELED:
            return {
                type: 'danger',
                title: translate(
                    `notifications.messages.${notification.type}.title`, {
                        'from': notification.data.routes.from,
                        'to': notification.data.routes.to,
                    }
                ),
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
        case NOTIFICATION_BOOKING_DECLINED:
            return {
                type: 'danger',
                title: translate(
                    `notifications.messages.${notification.type}.title`, {
                        'from': notification.data.routes.from,
                        'to': notification.data.routes.to,
                    }
                ),
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
        case NOTIFICATION_BOOKING_CREATED:
            return {
                type: 'warning',
                title: translate(
                    `notifications.messages.${notification.type}.title`, {
                        'from': notification.data.routes.from,
                        'to': notification.data.routes.to,
                    }
                ),
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
        case NOTIFICATION_REVIEW_ON_TRIP_CREATED:
            return {
                type: 'info',
                title: translate(
                    `notifications.messages.${notification.type}.title`, {
                        'from': notification.data['trip']['from'],
                        'to': notification.data['trip']['to'],
                    }
                ),
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
};
