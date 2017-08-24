import React from 'react';
import {Link} from 'react-router';
import {localize} from 'react-localize-redux';
import DateService from 'app/services/DateService';
import '../styles/booking-item.scss';

class BookingItem extends React.Component {
    render() {
        const {booking, translate} = this.props,
            date = DateService.dateFormat(booking.start_at_x);

        return (
            <Link to={"/trip/" + booking.trip_id} className="booking-item row">
                <div className="booking-item__date col-sm-3">
                    {date.date === 'today'
                        ? translate('today', {time: date.time})
                        : date.date === 'tomorrow'
                            ? translate('tomorrow', {time: date.time})
                            : `${date.date} - ${date.time}`
                    }
                </div>
                <div className="booking-item__route col-sm-7">
                    <span className="booking-item__route-item">{booking.from}</span>
                    <i className="booking-item__route-arrow fa fa-long-arrow-right" />
                    <span className="booking-item__route-item">{booking.to}</span>
                </div>
                <div className="booking-item__status col-sm-2">
                    <span className={"booking-item__badge booking-item__badge_" + booking.status}>{translate('bookings_list.'+booking.status)}</span>
                </div>
            </Link>
        );
    }
}

export default localize(BookingItem, 'locale');
