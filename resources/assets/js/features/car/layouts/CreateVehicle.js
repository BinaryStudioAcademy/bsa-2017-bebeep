import React from 'react';
import PageHeader from '../../../app/components/PageHeader';
import '../styles/vehicle.scss';
import '../styles/react-select.scss';
import CreateVehicleContainer from '../components/create/CreateVehicleContainer';

export default class CreateVehicle extends React.Component {
    render() {
        return (
            <div>
                <PageHeader header={'Create new vehicle'}/>
                <CreateVehicleContainer/>
            </div>
        );
    }
}