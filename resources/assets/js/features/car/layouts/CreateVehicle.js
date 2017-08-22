import React from 'react';
import PageHeader from '../../../app/components/PageHeader';
import '../styles/vehicle.scss';
import '../styles/react-select.scss';
import CreateVehicleForm from '../components/create/CreateVehicleForm';

export default class CreateVehicle extends React.Component {
    render() {
        return (
            <div>
                <PageHeader header={'Add new vehicle'}/>
                <CreateVehicleForm/>
            </div>
        );
    }
}