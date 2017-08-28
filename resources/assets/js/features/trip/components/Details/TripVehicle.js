import React from 'react';
import { localize } from 'react-localize-redux';

import { getVehiclePhoto } from 'app/services/PhotoService';

class TripVehicle extends React.Component {

    render() {
        const { vehicle, translate } = this.props;

        return (
            <section>
                <header className="trip-section-header">
                    <h3 className="h5">
                        { translate('trip_details.vehicle.header') }
                    </h3>
                </header>

                <div className="d-flex">
                    <figure className="trip-vehicle-image mr-4 mb-0">
                        { getVehiclePhoto(vehicle, 'trip-vehicle-image__item') }
                    </figure>

                    <div className="vehicle-info">
                        <span className="d-block">
                            <strong>{ vehicle.model }</strong>
                        </span>
                        <span className="trip-text-label vehicle-color mt-2">
                            { translate('trip_details.vehicle.color', {color: vehicle.color}) }
                        </span>
                    </div>
                </div>
            </section>
        )
    }
}

export default localize(TripVehicle, 'locale');
