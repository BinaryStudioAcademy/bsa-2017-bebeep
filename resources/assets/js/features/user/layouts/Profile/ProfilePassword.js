import React, { Component } from 'react';

import PageHeader from '../../../../app/components/PageHeader';
import PasswordForm from '../../components/Profile/PasswordForm';

class ProfilePassword extends Component {

    render() {
        return (
            <div>
                <PageHeader header={ 'Change password' } />
                <PasswordForm />
            </div>
        )
    }
}

export default ProfilePassword;
