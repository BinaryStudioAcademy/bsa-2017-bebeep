import React from 'react';
import { localize } from 'react-localize-redux';

import DriverCar from './DriverCar';
import ProfileActivity from '../ProfileActivity';
import ProfileVerifications from '../ProfileVerifications';

class DriverAdditionalInfo extends React.Component {

    render() {
        const { profile } = this.props;

        return (
            <div className="driver-additional-info">
                <DriverCar vehicle={ profile.vehicle.data } />
                <ProfileVerifications email_is_verified={ profile.email_is_verified } />
                <ProfileActivity
                    trips_count={ profile.trips_count }
                    activity_started={ profile.activity_started }
                />
            </div>
        );
    }
}

export default localize(DriverAdditionalInfo, 'locale');
