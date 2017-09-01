import React from 'react';
import { localize } from 'react-localize-redux';

import { getVehiclePhoto } from 'app/services/PhotoService';

import "features/public-profiles/styles/public-profile.scss";

class DriverCar extends React.Component {

    render() {
        const { vehicle, translate } = this.props;

        if (vehicle.length === 0) {
            return null;
        }

        return (
            <div className="driver-car-block">
                <p className="text-left">
                    <strong>{ translate('driver_public_profile.driver_car_header') } </strong>
                </p>

                <div className="driver-car">
                    { getVehiclePhoto(vehicle) }
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

export default localize(DriverCar, 'locale');
