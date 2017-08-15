import React from 'react';
import moment from 'moment';

class TripItem extends React.Component {
    render() {
        const {trip} = this.props;
        const fullName = trip.user.first_name + ' ' + trip.user.last_name;
        const age = moment().year() - moment(trip.user.birth_date * 1000).year();
        const start = moment(trip.start_at * 1000);
        const startDate = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][start.day()] + ' ' + start.date() + ' ' +
                ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][start.month()];
        return (
            <div className="trip-item">
                <div className="trip-item__user-container">
                    <img src={ trip.user.photo + '?' + trip.id }
                         alt={ fullName }
                         className="trip-item__user-photo"/>
                    <span className="trip-item__user-name">{ fullName }</span>
                    <span className="trip-item__user-age">{age}</span>
                </div>
                <div className="trip-item__trip-container">
                    <div className="trip-item__start-date">{startDate}</div>
                    <div className="trip-item__price">${trip.price}</div>
                </div>
            </div>
        )
    }
}

export default TripItem;