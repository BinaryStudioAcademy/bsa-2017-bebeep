import React from 'react';
import ProfileActivity from '../ProfileActivity';
import ProfileVerifications from '../ProfileVerifications';
import {localize} from 'react-localize-redux';

class DriverAdditionalInfo extends React.Component {
    render() {
        return (
            <div className="driver-additional-info">
                <ProfileVerifications />
                <ProfileActivity />
            </div>
        );
    }
}

export default localize(DriverAdditionalInfo, 'locale');
