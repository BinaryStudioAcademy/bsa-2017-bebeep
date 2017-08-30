import React from 'react';
import {localize} from 'react-localize-redux';

import "../styles/public-profile.scss";

class ProfileAbout extends React.Component {

    render() {
        const { about, translate } = this.props;

        return (
            <div className="driver__about">
                <p className="text-left"><strong>{translate('public_profile.profile_about_me')} </strong></p>
                <div className="driver__about-me">{about ? (about) : (translate('public_profile.profile_without_about'))}</div><br/>
            </div>
        );
    }
}

export default localize(ProfileAbout, 'locale');
