import React from 'react';
import {localize} from 'react-localize-redux';

import "../styles/public-profile.scss";

class ProfileVerifications extends React.Component {
    render() {
        const { translate } = this.props;

        return (
            <div className="driver-car-block">
                <p className="text-left"><strong>{translate('public_profile.profile_verifications')} </strong></p>
                <div className="driver-car-block-verifications">
                    <span><i className="fa fa-check-square-o" aria-hidden="true"></i>{translate('public_profile.profile_verifications_phone_number')}</span><br/>
                    <span><i className="fa fa-check-square-o" aria-hidden="true"></i>{translate('public_profile.profile_verifications_email')}</span><br/>
                    <span><i className="fa fa-check-square-o" aria-hidden="true"></i>{translate('public_profile.profile_verifications_agreement')}</span><br/>
                </div>
            </div>
        );
    }
}

export default localize(ProfileVerifications, 'locale');
