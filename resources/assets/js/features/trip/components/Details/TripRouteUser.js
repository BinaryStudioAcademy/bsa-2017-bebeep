import React from 'react';
import { Link } from 'react-router';
import { localize } from 'react-localize-redux';
import _ from 'lodash';

import UserTooltip from 'app/components/Tooltips/UserTooltip';

import { getDriverAvatar, getPassengerAvatar } from 'app/services/PhotoService';

class TripRouteUser extends React.Component {

    render() {
        const { translate, type, uniqueKey, user, age } = this.props;

        //const link = type === 'driver' ? `/driver/${user.id}` : '#';
        const getAvatar = type === 'driver' ? getDriverAvatar : getPassengerAvatar;

        user.age = age;

        return (
            <div className="trip-route-passenger">
                <Link to="#" id={"UserTooltip-" + uniqueKey}>
                    <figure className="trip-user-image trip-user-image--small">
                        <img className="trip-user-image__item"
                            alt={ user.full_name }
                            src={ getAvatar(user) }
                        />
                    </figure>
                </Link>

                <UserTooltip
                    user={ user }
                    target={"UserTooltip-" + uniqueKey}
                />

                <div className="passenger-info">
                    <span className="d-block">
                        <strong>{ _.truncate(user.full_name, {'length': 10}) }</strong>
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

export default localize(TripRouteUser, 'locale');
