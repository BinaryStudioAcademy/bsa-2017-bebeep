import React, { Component } from 'react';

import PageHeader from '../../../app/components/PageHeader';
import Form from '../components/Register/Form';

import '../styles/user_register.scss';

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