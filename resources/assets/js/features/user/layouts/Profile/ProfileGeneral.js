import React from 'react';

import PageHeader from 'app/components/PageHeader';
import GeneralForm from 'features/user/components/Profile/GeneralForm';

class ProfileGeneral extends React.Component {

    render() {
        return (
            <div>
                <PageHeader header={ 'Personal information' } />
                <GeneralForm />
            </div>
        )
    }
}

export default ProfileGeneral;
