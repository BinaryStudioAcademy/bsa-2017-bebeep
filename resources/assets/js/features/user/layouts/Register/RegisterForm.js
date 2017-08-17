import React, { Component } from 'react';

import Form from '../../components/Register/Form';
import PageHeader from '../../../../app/components/PageHeader';

class RegisterForm extends Component {

    render() {
        return (
            <div>
                <PageHeader header={ 'Register' } />
                <Form id={ this.props.params.id } />
            </div>
        )
    }
}

export default RegisterForm;
