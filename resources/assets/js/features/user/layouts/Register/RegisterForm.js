import React from 'react';

import PageHeader from 'app/components/PageHeader';
import Form from 'features/user/components/Register/Form';

class RegisterForm extends React.Component {

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
