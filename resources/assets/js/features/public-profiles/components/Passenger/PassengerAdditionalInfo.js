import React from 'react';
import { localize } from 'react-localize-redux';

import ProfileActivity from '../ProfileActivity';
import ProfileVerifications from '../ProfileVerifications';
import ProfileWriteMessage from '../ProfileWriteMessage';

class PassengerAdditionalInfo extends React.Component {

    render() {
        const { profile } = this.props;

        return (
            <div className="driver-additional-info">
                <ProfileVerifications email_is_verified={ profile.email_is_verified } />
                <ProfileActivity
                    trips_count={ profile.trips_count }
                    activity_started={ profile.activity_started }
                />
                <ProfileWriteMessage id={profile.id} />
            </div>
        );
    }
}

export default localize(PassengerAdditionalInfo, 'locale');
