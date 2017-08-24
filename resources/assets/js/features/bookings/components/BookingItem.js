import React from 'react';
import {Link} from 'react-router';
import {localize} from 'react-localize-redux';
import '../styles/booking-item.scss';
import moment from 'moment';

class BookingItem extends React.Component {

    dateFormat(timestamp) {
        const {translate} = this.props,
            date = moment(timestamp * 1000),
            locale = moment().locale(),
            localeData = moment().locale(locale).localeData(),
            day = _.padStart(date.date(), 2, '0'),
            weekday = _.capitalize(localeData.weekdaysShort(date)),
            month = _.capitalize(localeData.monthsShort(date)),
            minute = _.padStart(date.minute(), 2, '0'),
            hour = _.padStart(date.hour(), 2, '0'),
            now = moment(),
            time = `- ${hour}:${minute}`;
        if (now.isSame(date, 'day')) {
            return `${translate('bookings_list.today')} ${time}`
        } else if (now.isSame(date.subtract(1, 'day'), 'day')) {
            return `${translate('bookings_list.tomorrow')} ${time}`
        }
        return `${weekday}. ${day} ${month} ${time}`;
    }

    render() {
        const {booking, translate} = this.props;

        return (
            <Link to={"/trip/" + booking.trip_id} className="booking-item row">
                <div className="booking-item__date col-sm-3">
                    {this.dateFormat(booking.start_at_x)}
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
