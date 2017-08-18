import React from 'react';

import PageHeader from 'app/components/PageHeader';
import Form from 'features/user/components/Login/Form';

import 'features/user/styles/user.scss';

class LoginForm extends React.Component {

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
