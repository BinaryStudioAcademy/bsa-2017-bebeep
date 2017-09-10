import React from 'react';
import {securedRequest} from './RequestService';
import LangService from './LangService';
import DateTimeHelper from 'app/helpers/DateTimeHelper'

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
        case "booking_approved":
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
        case "booking_canceled":
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
        case "booking_declined":
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
        case "booking_created":
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
        case "review_on_trip_created":
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
