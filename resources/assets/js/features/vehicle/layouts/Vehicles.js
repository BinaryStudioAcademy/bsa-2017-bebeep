import React, { Component } from 'react';

import PageHeader from '../../../app/components/PageHeader';
import VehiclesList from '../components/VehiclesList';

import '../styles/vehicle.scss';

class Vehicles extends Component {

    render() {
        return (
            <div>
                <PageHeader header={ 'Vehicles list' } />
                <VehiclesList />
            </div>
        )
    }
}

export default Vehicles;
