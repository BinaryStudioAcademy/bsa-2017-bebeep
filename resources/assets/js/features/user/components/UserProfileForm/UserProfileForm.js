import React, { Component } from 'react';

import PageHeader from '../../../../app/components/PageHeader';

class UserProfileForm extends Component {

    render() {
        return (
            <div>
                <PageHeader header={ 'Personal information' } />
            </div>
        )
    }
}

export default UserProfileForm;
