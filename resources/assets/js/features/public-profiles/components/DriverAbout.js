import React from 'react';
import {localize} from 'react-localize-redux';

import "../styles/driver-profile.scss";

class DriverAbout extends React.Component {

    render() {
        const { translate } = this.props;

        return (
            <div className="driver-about">
                <p className="text-left"><strong>{translate('driver_public_profile.driver_about_me')} </strong></p>
                <div className="driver-about-me">
                    Creative guy. Work in film and TV. From Manchester and now based between there and London, and often driving between the two. Any requests, just ask!.
                </div><br/>
            </div>
        );
    }
}

export default localize(DriverAbout, 'locale');
