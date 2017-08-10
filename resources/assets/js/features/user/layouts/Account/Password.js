import React, { Component } from 'react';

import PageHeader from '../../../../app/components/PageHeader';
import PasswordForm from '../../components/Account/PasswordForm';

class Password extends Component {

    render() {
        return (
            <div>
                <PageHeader header={ 'Change password' } />
                <PasswordForm />
            </div>
        )
    }
}

export default Password;
