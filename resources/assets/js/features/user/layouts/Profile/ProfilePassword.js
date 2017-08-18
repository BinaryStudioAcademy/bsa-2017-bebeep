import React from 'react';

import PageHeader from 'app/components/PageHeader';
import PasswordForm from 'features/user/components/Profile/PasswordForm';

class ProfilePassword extends React.Component {

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
