import React from 'react';
import {localize} from 'react-localize-redux';

import "../styles/driver-profile.scss";

class DriverProfile extends React.Component {
    render() {
        const { translate } = this.props;

        return (
            <div className="driver-car-block">
                <p className="text-left"><strong>{translate('driver_public_profile.driver_activity')} </strong></p>
                <div className="driver-activity">
                    <span>{translate('driver_public_profile.driver_activity_rides')}</span><span className="text-muted">15</span><br/>
                    <span>{translate('driver_public_profile.driver_activity_online')}</span><span className="text-muted">22.08.2017</span><br/>
                    <span>{translate('driver_public_profile.driver_activity_member_since')}</span><span className="text-muted">11.11.2016</span><br/>
                </div>
            </div>
        );
    }
}

export default localize(DriverProfile, 'locale');
