import React from 'react';
import {localize} from 'react-localize-redux';

import "../styles/driver-profile.scss";

class ProfileVerifications extends React.Component {
    render() {
        const { translate } = this.props;

        return (
            <div className="driver-car-block">
                <p className="text-left"><strong>{translate('driver_public_profile.driver_verifications')} </strong></p>
                <div className="driver-verifications">
                    <span><i className="fa fa-check-square-o" aria-hidden="true"></i>{translate('driver_public_profile.driver_verifications_phone_number')}</span><br/>
                    <span><i className="fa fa-check-square-o" aria-hidden="true"></i>{translate('driver_public_profile.driver_verifications_email')}</span><br/>
                    <span><i className="fa fa-check-square-o" aria-hidden="true"></i>{translate('driver_public_profile.driver_verifications_agreement')}</span><br/>
                </div>
            </div>
        );
    }
}

export default localize(ProfileVerifications, 'locale');
