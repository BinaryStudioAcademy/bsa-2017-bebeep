import React from 'react';
import { localize } from 'react-localize-redux';
import {defaultUserPhoto} from 'app/services/PhotoService';
import { Link } from 'react-router';

import '../styles/booking-info.scss';

export default localize(class BookingInfo extends React.Component {
    render() {
        const { translate, booking, onApprove, onDecline } = this.props;
        return (
            <li className="li-bookings">
                <div className="row">
                    <div className="col-md-2"><img src={booking.img ? booking.img : defaultUserPhoto} className="img-circle img-booking-user img-responsive" /></div>
                    <div className="col-md-4">
                        <Link to={"/passenger/" + booking.user_id} className="">
                            <span>{booking.first_name} {booking.last_name}</span>
                        </Link>
                    </div>
                    <div className="col-md-3"><button className="btn btn-sm hover btn-success" onClick={onApprove}>{translate('booking.accept_button')}</button></div>
                    <div className="col-md-3"><button className="btn btn-sm hover btn-danger" onClick={onDecline}>{translate('booking.reject_button')}</button></div>
                </div>
            </li>
        );
    }
}, 'locale');