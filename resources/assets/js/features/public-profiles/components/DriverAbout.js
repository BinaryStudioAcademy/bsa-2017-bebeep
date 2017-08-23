import React from 'react';
import {localize} from 'react-localize-redux';

import "../styles/driver-profile.scss";

class DriverAbout extends React.Component {

    render() {
        const { about, translate } = this.props;

        return (
            <div className="driver-about">
                <p className="text-left"><strong>{translate('driver_public_profile.driver_about_me')} </strong></p>
                <div className="driver-about-me">{about}</div><br/>
            </div>
        );
    }
}

export default localize(DriverAbout, 'locale');
