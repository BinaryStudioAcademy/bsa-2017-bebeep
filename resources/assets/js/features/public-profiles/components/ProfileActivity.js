import React from 'react';
import { localize } from 'react-localize-redux';

import "../styles/public-profile.scss";

class DriverProfile extends React.Component {

    render() {
        const { translate, trips_count, activity_started } = this.props;

        return (
            <div className="driver-car-block">
                <p className="text-left">
                    <strong>{ translate('public_profile.profile_activity') } </strong>
                </p>
                <div className="driver-activity">
                    <span>{ translate('public_profile.profile_activity_rides') }</span>
                    <span className="text-muted">{ trips_count }</span><br/>

                    <span>{ translate('public_profile.profile_activity_member_since') }</span>
                    <span className="text-muted">{ activity_started }</span><br/>
                </div>
            </div>
        );
    }
}

export default localize(DriverProfile, 'locale');
