import React, { Component } from 'react';

import PageHeader from '../../../app/views/partials/PageHeader';
import VehicleProfile from '../components/VehicleProfile';

import '../styles/vehicle.scss';

class VehicleOne extends Component {

    render() {
        return (
            <div>
                <PageHeader header={ 'Vehicle Profile' } />
                <VehicleProfile id={ this.props.params.id } />
            </div>
        )
    }
}

export default VehicleOne;
