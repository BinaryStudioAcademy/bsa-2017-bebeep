import React from 'react';
import { localize } from 'react-localize-redux';

import DateTimeHelper from 'app/helpers/DateTimeHelper';
import { BOOKING_STATUS_DECLINED, BOOKING_STATUS_CANCELED } from 'app/services/BookingService';

import '../styles/booking-item.scss';

class BookingItem extends React.Component {

    formatStartAt() {
        const { booking, translate } = this.props;

        return DateTimeHelper.dateFormatLocale({
            timestamp: booking.start_at_x,
            getTranslate: translate,
        });
    }

    renderCancelButton() {
        const { booking, showCancelBookingModal, translate } = this.props;

        if (booking.status === BOOKING_STATUS_DECLINED ||
            booking.status === BOOKING_STATUS_CANCELED
        ) {
            return null;
        }

        return (
            <button onClick={() => { showCancelBookingModal(booking) }}
                className="btn hover btn-secondary btn-cancel-booking"
            >
                { translate('bookings_list.cancel') }
            </button>
        );
    }

    render() {
        const { booking, translate } = this.props,
            startedAt = this.formatStartAt();

        return (
            <div className="booking-item row">
                <div className="booking-item__date col-sm-3">{ startedAt }</div>

                <div className="booking-item__route col-sm-5">
                    <span className="booking-item__route-item">{ booking.from }</span>
                    <i className="booking-item__route-arrow fa fa-long-arrow-right" />
                    <span className="booking-item__route-item">{ booking.to }</span>
                </div>

                <div className="booking-item__status col-sm-4">
                    <span className={ "booking-item__badge booking-item__badge_" + booking.status }>
                        { translate(`bookings_list.${booking.status}`) }
                    </span>

                    { this.renderCancelButton() }
                </div>
            </div>
        );
    }
}

export default localize(BookingItem, 'locale');
