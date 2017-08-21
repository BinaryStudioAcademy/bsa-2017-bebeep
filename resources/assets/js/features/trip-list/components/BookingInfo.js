import React from 'react';
import '../styles/booking-info.scss';

export default class BookingInfo extends React.Component {
    render() {
        const { keys, booking, onApprove, onDecline} = this.props;
        return (
            <ul className="list-unstyled">
                <li key={ keys } className="li-bookings">
                    <div className="row">
                        <div className="col-md-2"><img src={booking.img} className="img-circle img-booking-user img-responsive" /></div>
                        <div className="col-md-4"><span>{booking.first_name} {booking.last_name}</span></div>
                        <div className="col-md-2"><button className="btn btn-sm hover btn-success" onClick={onApprove}>Accept</button></div>
                        <div className="col-md-2"><button className="btn btn-sm hover btn-danger" onClick={onDecline}>Reject</button></div>
                    </div>
                </li>
            </ul>
        );
    }
}