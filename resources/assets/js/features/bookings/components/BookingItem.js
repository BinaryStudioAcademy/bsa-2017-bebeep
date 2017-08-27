import React from 'react';
import {localize} from 'react-localize-redux';
import DateTimeHelper from 'app/helpers/DateTimeHelper';
import '../styles/booking-item.scss';

class BookingItem extends React.Component {
    render() {
        const {booking, translate} = this.props,
            date = DateTimeHelper.dateFormat(booking.start_at_x);

        return (
            <div className="booking-item row">
                <div className="booking-item__date col-sm-3">
                    {date.date === 'today'
                        ? translate('today', {time: date.time})
                        : date.date === 'tomorrow'
                            ? translate('tomorrow', {time: date.time})
                            : `${date.date} - ${date.time}`
                    }
                </div>
                <div className="booking-item__route col-sm-5">
                    <span className="booking-item__route-item">{booking.from}</span>
                    <i className="booking-item__route-arrow fa fa-long-arrow-right" />
                    <span className="booking-item__route-item">{booking.to}</span>
                </div>
                <div className="booking-item__status col-sm-4">
                    <span className={"booking-item__badge booking-item__badge_" + booking.status}>{translate('bookings_list.'+booking.status)}</span>
                    {booking.status !== 'canceled' &&
                        <button onClick={() => {this.props.showCancelBookingModal(booking)}} className="btn hover btn-secondary btn-cancel-booking">{translate('bookings_list.cancel')}</button>
                    }
                </div>
            </div>
        );
    }
}

export default localize(BookingItem, 'locale');
