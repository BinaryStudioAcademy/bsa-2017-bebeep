import React from 'react';
import '../styles/trip-item.scss';

class TripItem extends React.Component {
    render() {
        const {trip} = this.props;
        return (
            <div className="trip-item">
                <div className="trip-item__user-container">
                    <img src={ trip.user.photo + '?' + trip.id }
                         alt={ trip.user.full_name }
                         className="trip-item__user-photo"/>
                    <span className="trip-item__user-name">{ trip.user.full_name }</span>
                    <span className="trip-item__user-age">{ trip.user.age }</span>
                </div>
                <div className="trip-item__trip-container">
                    <div className="trip-item__start-date">{ trip.start_date }</div>
                    <div className="trip-item__price">${trip.price}</div>
                    <div className="trip-item__from">From: {trip.route.from}</div>
                    <div className="trip-item__to">To: {trip.route.to}</div>
                </div>
            </div>
        )
    }
}

export default TripItem;