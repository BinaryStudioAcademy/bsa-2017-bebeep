import React from 'react';
import {securedRequest} from './RequestService';
import LangService from './LangService';
import DateTimeHelper from 'app/helpers/DateTimeHelper'

export const NOTIFICATION_BOOKING_APPROVED = 'booking_approved';
export const NOTIFICATION_BOOKING_CANCELED = 'booking_canceled';
export const NOTIFICATION_BOOKING_DECLINED = 'booking_declined';
export const NOTIFICATION_BOOKING_CREATED = 'booking_created';
export const NOTIFICATION_REVIEW_ON_TRIP_CREATED = 'review_on_trip_created';
export const NOTIFICATION_CHAT_MESSAGE_RECEIVED = 'chat_new_message';
export const NOTIFICATION_TRIP_CREATED = 'trip_created';

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
                    }).date}),
                link: `/bookings`
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
                    }).date}),
                link: `/bookings`
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
                    }).date}),
                link: `/bookings`
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
                message: translate(
                    `notifications.messages.${notification.type}.message${LangService.getNumberForm(notification.data.booking.seats)}`,
                    {
                        'first_name': notification.data.user.first_name,
                        'last_name': notification.data.user.last_name,
                        'seats': notification.data.booking.seats,
                        'from': notification.data.routes.from,
                        'to': notification.data.routes.to,
                        'start_at': DateTimeHelper.dateFormat(notification.data.trip.start_at, {
                            onlyDate: true,
                            dateFormat: 'MM.DD.YYYY'
                        }).date
                    }),
                link: `/trips/?booking_trip=${notification.data.trip.trip_id}`
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
                }),
                link: '/dashboard/profile/reviews/received'
            };
        case NOTIFICATION_CHAT_MESSAGE_RECEIVED:
            return {
                type: 'info',
                title: translate(`notifications.messages.${notification.type}.title`, {
                    'name': notification.sender.data.first_name + ' ' + notification.sender.data.first_name
                }),
                message: translate(`notifications.messages.${notification.type}.message`, {
                    message: notification.message
                }),
                link: `/dashboard/messages/${notification.sender_id}`
            };
        case NOTIFICATION_TRIP_CREATED:
            const rating = notification.data.params.rating
                ? parseFloat(notification.data.params.rating).toFixed(2)
                : 0;

            return {
                type: 'info',
                title: translate(`notifications.messages.${notification.type}.title`),
                message: [
                    translate(`notifications.messages.${notification.type}.message`, {
                        'start_at': DateTimeHelper.dateFormat(notification.data.start_at_x, {
                            onlyDate: true,
                            dateFormat: 'MM.DD.YYYY'
                        }).date,
                        'from': notification.data.from,
                        'to': notification.data.to
                    }),
                    translate(`notifications.messages.${notification.type}.params.animals`, {
                        'animals': notification.data.params.animals
                            ? translate(`notifications.messages.${notification.type}.params.yes`)
                            : translate(`notifications.messages.${notification.type}.params.no`)
                    }),
                    translate(`notifications.messages.${notification.type}.params.luggage_size`, {
                        'size': notification.data.params.luggage_size > 3
                            ? translate(`notifications.messages.${notification.type}.params.more_four`)
                            : translate(`notifications.messages.${notification.type}.params.luggage_size${notification.data.params.luggage_size}`)
                    }),
                    translate(`notifications.messages.${notification.type}.params.price`, {
                        'price': notification.data.params.price
                    }),
                    translate(`notifications.messages.${notification.type}.params.seats`, {
                        seats:  notification.data.params.seats
                    }),
                    translate(`notifications.messages.${notification.type}.params.rating`, { rating })
                ].map((element, index) => (<span key={index}>{element}</span>)),
                link: `/trip/${notification.data.trip_id}`
            };
        default:
            return {
                type: '',
                title: '',
                message: '',
                link: ''
            };
    }
};
