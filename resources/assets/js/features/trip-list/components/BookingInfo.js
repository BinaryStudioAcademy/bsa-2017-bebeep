import React from 'react';
import { localize } from 'react-localize-redux';

import '../styles/booking-info.scss';

class BookingInfo extends React.Component {

    render() {
        const { translate, booking, onApprove, onDecline } = this.props,
            user = booking.user;

        return (
            <li className="li-bookings">
                <div className="row">
                    <div className="col-md-2">
                        <img src={user.photo}
                            className="img-circle img-booking-user img-responsive" />
                    </div>

                    <div className="col-md-4">
                        <span>{ user.full_name }</span>
                    </div>

                    <div className="col-md-3">
                        <button className="btn btn-sm hover btn-success"
                            onClick={onApprove}
                        >
                            { translate('booking.accept_button') }
                        </button>
                    </div>

                    <div className="col-md-3">
                        <button className="btn btn-sm hover btn-danger"
                            onClick={onDecline}
                        >
                            { translate('booking.reject_button') }
                        </button>
                    </div>
                </div>
            </li>
        );
    }
}

export default localize(BookingInfo, 'locale');
