import React, { Component } from 'react';

import PageHeader from '../../../../app/components/PageHeader';
import AvatarUpload from '../../components/Profile/AvatarUpload';

class Avatar extends Component {

    render() {
        return (
            <div>
                <PageHeader header={ 'Change profile avatar' } />
                <AvatarUpload />
            </div>
        )
    }
}

export default Avatar;
