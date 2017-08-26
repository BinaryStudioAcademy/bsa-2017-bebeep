import React from 'react';
import { localize } from 'react-localize-redux';
import _ from 'lodash';

import { getDriverAvatar, getPassengerAvatar } from 'app/services/PhotoService';

class TripRoutePerson extends React.Component {

    render() {
        const { type, person, age, translate } = this.props;
        const getAvatar = type === 'driver' ? getDriverAvatar : getPassengerAvatar;

        return (
            <div className="trip-route-passenger">
                <figure className="trip-user-image trip-user-image--small">
                    <img className="trip-user-image__item"
                        alt={ person.full_name }
                        src={ getAvatar(person) }
                    />
                </figure>

                <div className="passenger-info">
                    <span className="d-block">
                        <strong>{ _.truncate(person.full_name, {'length': 10}) }</strong>
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

export default localize(TripRoutePerson, 'locale');
