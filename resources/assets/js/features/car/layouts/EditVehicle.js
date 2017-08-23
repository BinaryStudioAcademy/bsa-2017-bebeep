import React from 'react';
import PageHeader from '../../../app/components/PageHeader';
import '../styles/vehicle.scss';
import '../styles/react-select.scss';
import EditVehicleForm from '../components/Containers/EditVehicle';

export default class EditVehicle extends React.Component {
    render() {
        return (
            <div>
                <PageHeader header={'Edit vehicle'}/>
                <EditVehicleForm id={ this.props.params.id }/>
            </div>
        );
    }
}