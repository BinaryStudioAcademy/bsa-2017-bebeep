import React from 'react';
import { localize } from 'react-localize-redux';

import "../styles/public-profile.scss";

class ProfileVerifications extends React.Component {

    renderVerificationRule(rule, value) {
        const { translate } = this.props,
            status = value ? 'success' : 'error';

        return (
            <div className={
                "driver-car-block__verification-rule driver-car-block__verification-rule--" + status
            }>
                <i className="fa fa-check-square-o" aria-hidden="true" />
                    { translate(`public_profile.verifications.${rule}.${status}`) }
            </div>
        );
    }

    // TODO :: this.renderVerificationRule('phone_number', ...)
    // TODO :: this.renderVerificationRule('agreement', ...)

    render() {
        const { translate, email_is_verified } = this.props;

        return (
            <div className="driver-car-block">
                <p className="text-left">
                    <strong>{ translate('public_profile.verifications.header') } </strong>
                </p>
                <div className="driver-car-block__verifications">
                    { /*this.renderVerificationRule('phone_number', true)*/ }
                    { this.renderVerificationRule('email', email_is_verified) }
                    { /*this.renderVerificationRule('agreement', true)*/ }
                </div>
            </div>
        );
    }
}

export default localize(ProfileVerifications, 'locale');
