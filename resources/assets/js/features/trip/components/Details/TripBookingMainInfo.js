import React from 'react';
import { localize } from 'react-localize-redux';

class TripBookingMainInfo extends React.Component {

    render() {
        const { translate, price, possibleSeats } = this.props;

        return (
            <div className="d-flex">
                <div className="trip-price px-3 py-2">
                    <span className="trip-booking-value d-block">
                        $ { price }
                    </span>
                    <span className="trip-text-label">
                        { translate('trip_details.booking_main_info.price_label') }
                    </span>
                </div>
                <div className="trip-places-free px-3 py-2">
                    <span className="trip-booking-value d-block">{ possibleSeats }</span>
                    <span className="trip-text-label">
                        { translate('trip_details.booking_main_info.places_label') }
                    </span>
                </div>
            </div>
        )
    }
}

export default localize(TripBookingMainInfo, 'locale');
