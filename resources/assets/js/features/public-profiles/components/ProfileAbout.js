import React from 'react';
import {localize} from 'react-localize-redux';

import "../styles/public-profile.scss";

class ProfileAbout extends React.Component {

    getAbout() {
        const { about, translate } = this.props;

        return about ? about : translate('public_profile.profile_without_about');
    }

    render() {
        const { translate } = this.props,
            about = this.getAbout();

        return (
            <div className="driver__about">
                <p className="text-left">
                    <strong>{ translate('public_profile.profile_about_me') } </strong>
                </p>
                <div className="driver__about-me">{ about }</div><br/>
            </div>
        );
    }
}

export default localize(ProfileAbout, 'locale');
