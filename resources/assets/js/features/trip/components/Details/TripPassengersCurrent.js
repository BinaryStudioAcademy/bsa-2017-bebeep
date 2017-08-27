import React from 'react';
import { localize } from 'react-localize-redux';
import _ from 'lodash';

import TripUserImage from './TripUserImage';
import UserTooltip from 'app/components/Tooltips/UserTooltip';


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

                return <li className="trip-passengers-current__item" key={i}>
                    <TripUserImage
                        user={ passenger }
                        type="passenger"
                        id={"PassengerCurrentTooltip-" + i}
                        className="trip-user-image trip-user-image--small"
                    />
                    <UserTooltip user={ passenger } target={"PassengerCurrentTooltip-" + i } />
                </li>
            });
        });
    }

    renderSeatsFree() {
        const { maxSeats } = this.props;
        const busy = 3;

        return [...Array(maxSeats - busy)].map((n, i) =>
            <li className="trip-passengers-current__item" key={i}>
                <span className="trip-passengers-current__free" />
            </li>
        );
    }

    render() {
        const { translate } = this.props;

        return (
            <div className="trip-passengers-current p-3">
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
