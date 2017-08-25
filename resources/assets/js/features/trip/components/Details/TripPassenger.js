import React from 'react';
import { localize } from 'react-localize-redux';
import _ from 'lodash';

import { getPassengerAvatar } from 'app/services/PhotoService';

class TripPassenger extends React.Component {

    render() {
        const { passenger, age, translate } = this.props;

        return (
            <div className="trip-route-passenger">
                <figure className="trip-user-image trip-user-image--small">
                    <img className="trip-user-image__item"
                        alt={ passenger.full_name }
                        src={ getPassengerAvatar(passenger) }
                    />
                </figure>

                <div className="passenger-info">
                    <span className="d-block">
                        <strong>{ _.truncate(passenger.full_name, {'length': 10}) }</strong>
                    </span>
                    <span className="trip-text-label mt-1">
                        { translate(
                            'trip_details.routes_passengers.age_label',
                            {age: age}
                        ) }
                    </span>
                </div>
            </div>
        )
    }
}

export default localize(TripPassenger, 'locale');
