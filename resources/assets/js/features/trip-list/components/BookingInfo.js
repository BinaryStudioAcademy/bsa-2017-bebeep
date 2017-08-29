import React from 'react';
import { localize } from 'react-localize-redux';

import '../styles/booking-info.scss';

class BookingInfo extends React.Component {

    render() {
        const { translate, booking, onApprove, onDecline } = this.props,
            user = booking.user;

        return (
            <li className="li-bookings booking-modal-item">
                <div className="row">
                    <div className="col-md-2">
                        <img src={user.photo}
                            className="img-circle img-booking-user img-responsive" />
                    </div>

                    <div className="col-md-5">
                        <span>{ user.full_name }</span>
                    </div>

                    <div className="col-md-5">
                        <strong className="mr-2">
                            { translate('booking.seats') }:
                        </strong>
                        <span>{ booking.seats }</span>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-md-12 booking-modal-item__buttons">
                        <button className="btn btn-sm hover btn-success booking-modal-item__button"
                            onClick={onApprove}
                        >
                            { translate('booking.accept_button') }
                        </button>

                        <button className="btn btn-sm hover btn-danger booking-modal-item__button"
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
