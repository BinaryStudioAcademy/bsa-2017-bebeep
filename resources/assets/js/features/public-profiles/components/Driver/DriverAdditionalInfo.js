import React from 'react';
import DriverCar from './DriverCar';
import ProfileActivity from '../ProfileActivity';
import ProfileVerifications from '../ProfileVerifications';
import {localize} from 'react-localize-redux';

class DriverAdditionalInfo extends React.Component {

    render() {
        const { vehicle, email_is_verified, activity_started } = this.props;
        return (
            <div className="driver-additional-info">
                <DriverCar vehicle={ vehicle.data } />
                <ProfileVerifications email_is_verified={ email_is_verified } />
                <ProfileActivity activity_started={ activity_started } />
            </div>
        );
    }
}

export default localize(DriverAdditionalInfo, 'locale');
