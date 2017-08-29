import React from 'react';
import { localize } from 'react-localize-redux';
import _ from 'lodash';

import TripUserImage from '../TripUserImage';
import UserTooltip from 'app/components/Tooltips/UserTooltip';


class RouteUser extends React.Component {

    render() {
        const { translate, type, uniqueKey, user } = this.props;

        return (
            <div className="trip-routes__passenger">
                <TripUserImage
                    user={ user }
                    type={ type }
                    id={"UserTooltip-" + uniqueKey}
                    className="trip-user-image trip-user-image--small"
                />

                <UserTooltip user={ user } target={"UserTooltip-" + uniqueKey} />

                <div>
                    <span className="d-block">
                        <strong>{ _.truncate(user.full_name, {'length': 10}) }</strong>
                    </span>
                    <span className="trip-text-label mt-1">
                        { translate(
                            'trip_details.routes_passengers.age_label',
                            { age: user.age }
                        ) }
                    </span>
                </div>
            </div>
        )
    }
}

export default localize(RouteUser, 'locale');
