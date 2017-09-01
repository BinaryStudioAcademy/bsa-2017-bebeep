import React from 'react';
import {localize} from 'react-localize-redux';
import {defaultCarPhoto} from 'app/services/PhotoService';

import "../../styles/public-profile.scss";

class DriverProfile extends React.Component {

    render() {
        const { vehicle, translate } = this.props;

        return (
            <div className="driver-car-block">
                <p className="text-left">
                    <strong>{ translate('driver_public_profile.driver_car_header') } </strong>
                </p>

                <div className="car-logo">
                    <img src={vehicle.photo ? vehicle.photo : defaultCarPhoto}
                        className="img-responsive driver-car" />
                </div>
                <span>{ translate('driver_public_profile.driver_car_model') }</span>

                <span className="text-muted">
                    { `${vehicle.brand} ${vehicle.model}` }
                </span><br/>

                <span>{ translate('driver_public_profile.driver_car_color') }</span>
                <span className="text-muted">{ vehicle.color }</span><br/>
            </div>
        );
    }
}

export default localize(DriverProfile, 'locale');
