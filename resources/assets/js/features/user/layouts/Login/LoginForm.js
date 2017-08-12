import React, { Component } from 'react';

import PageHeader from '../../../../app/components/PageHeader';
import Form from '../../components/Login/Form';

import '../../styles/user.scss';

class LoginForm extends Component {

    render() {
        return (
            <div>
                <PageHeader header={ 'Login' } />
                <Form />
            </div>
        )
    }
}

export default LoginForm;
