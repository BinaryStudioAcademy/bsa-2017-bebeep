import React, { Component } from 'react';

import PageHeader from '../../../app/components/PageHeader';
import Form from '../components/Add/Form';

import '../styles/vehicle.scss';
import '../styles/react-select.scss';
// import '../../../../../../node_modules/react-select/dist/react-select.css';
// import 'react-select/dist/react-select.css';

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