import React from 'react';
import {localize} from 'react-localize-redux';
import DriverBasicInfo from './DriverBasicInfo';
import DriverRating from './DriverRating';
import DriverComment from './DriverComment';
import DriverAbout from './DriverAbout';

import "../styles/driver-profile.scss";

class DriverProfile extends React.Component {

    render() {
        const { translate } = this.props;

        return (
            <div className="driver-profile">
                <DriverBasicInfo />
                <DriverRating />
                <DriverAbout />
                <DriverComment />
            </div>
        );
    }
}

export default localize(DriverProfile, 'locale');
