import React from 'react';
import {localize} from 'react-localize-redux';

import "../styles/driver-profile.scss";

class DriverProfile extends React.Component {
    render() {
        const { translate } = this.props;

        return (
            <div className="driver-car-block">
                <p className="text-left"><strong>{translate('driver_public_profile.driver_car_header')} </strong></p>
                <div className="car-logo">
                    <img src="https://cdn4.iconfinder.com/data/icons/car-silhouettes/1000/sedan-512.png" className="img-responsive driver-car" />
                </div>
                <span>{translate('driver_public_profile.driver_car_model')}</span><span className="text-muted">BMW X5</span><br/>
                <span>{translate('driver_public_profile.driver_car_color')}</span><span className="text-muted">blue</span><br/>
            </div>
        );
    }
}

export default localize(DriverProfile, 'locale');
