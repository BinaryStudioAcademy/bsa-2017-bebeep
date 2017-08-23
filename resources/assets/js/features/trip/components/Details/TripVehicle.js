import React from 'react';
import { localize } from 'react-localize-redux';

import LangService from 'app/services/LangService';
import * as lang from 'features/trip/lang/details/TripVehicle.locale.json';

class TripVehicle extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    renderPhoto() {
        const vehicle = this.props.vehicle;

        if (vehicle.photo === null) {
            return (<i className="fa fa-3x fa-car" aria-hidden="true" />);
        }
        return (<img src={ vehicle.photo } alt={ vehicle.brand } />);
    }

    render() {
        const { vehicle, translate } = this.props;

        return (
            <section>
                <header>
                    <h3 className="h5">{translate('trip_vehicle.header')}</h3>
                </header>

                <div className="d-flex">
                    <figure className="vehicle-image mr-4">
                        { this.renderPhoto() }
                    </figure>

                    <div className="vehicle-info">
                        <p><strong>{ vehicle.brand }</strong></p>
                        <p className="vehicle-color">
                            { translate('trip_vehicle.color') }: { vehicle.color }
                        </p>
                    </div>
                </div>
            </section>
        )
    }
}

export default localize(TripVehicle, 'locale');
