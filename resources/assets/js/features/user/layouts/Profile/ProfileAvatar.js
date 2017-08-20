import React from 'react';

import PageHeader from 'app/components/PageHeader';
import AvatarUpload from 'features/user/components/Profile/AvatarUpload';

class ProfileAvatar extends React.Component {

    render() {
        return (
            <div>
                <PageHeader header={ 'Change profile avatar' } />
                <AvatarUpload />
            </div>
        )
    }
}

export default ProfileAvatar;
