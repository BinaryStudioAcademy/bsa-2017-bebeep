import React, { Component } from 'react';

import PageHeader from '../../../app/components/PageHeader';
import Form from '../components/Add/Form';

import '../styles/vehicle.scss';

class VehicleForm extends Component {

    render() {
        return (
            <div>
                <PageHeader header={ 'Add New Vehicle' } />
                <Form />
            </div>
        )
    }
}

export default VehicleForm;