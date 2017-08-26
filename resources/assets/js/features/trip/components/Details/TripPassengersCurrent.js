import React from 'react';
import { Link } from 'react-router';
import { localize } from 'react-localize-redux';
import _ from 'lodash';

import UserTooltip from 'app/components/Tooltips/UserTooltip';

import { getPassengerAvatar } from 'app/services/PhotoService';


class TripPassengersCurrent extends React.Component {

    renderPassengers() {
        const { bookings } = this.props;

        return bookings.map((booking) => {
            if (booking.status !== 'approved') {
                return null;
            }

            const passenger = booking.user.data;

            return [...Array(booking.seats)].map((n, i) => {
                i = i + passenger.id;

                return <li className="trip-passenger__item" key={i}>
                    <Link to="#" id={"PassengerCurrentTooltip-" + i}>
                        <img className="trip-passenger"
                            alt={ passenger.full_name }
                            src={ getPassengerAvatar(passenger) }
                        />
                    </Link>
                    <UserTooltip user={ passenger } target={"PassengerCurrentTooltip-" + i } />
                </li>
            });
        });
    }

    renderSeatsFree() {
        const { maxSeats } = this.props;
        const busy = 3;

        return [...Array(maxSeats - busy)].map((n, i) =>
            <li className="trip-passenger__item" key={i}>
                <span className="trip-passenger trip-passenger--free" />
            </li>
        );
    }

    render() {
        const { translate } = this.props;

        return (
            <div className="trip-passengers p-3">
                <span className="trip-text-label d-block">
                    { translate('trip_details.passengers_list.header') }
                </span>

                <ul className="d-flex flex-wrap justify-content-center list-unstyled mt-3">
                    { this.renderPassengers() }
                    { this.renderSeatsFree() }
                </ul>
            </div>
        )
    }
}

export default localize(TripPassengersCurrent, 'locale');
