import React from 'react';

import LangService from 'app/services/LangService';
import * as lang from 'features/user/lang/Profile/ProfileAvatar.locale.json';
import {localize} from 'react-localize-redux';
import PageHeader from 'app/components/PageHeader';
import AvatarUpload from 'features/user/components/Profile/AvatarUpload';

class ProfileAvatar extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;
        return (
            <div>
                <PageHeader header={ translate('profile_avatar.change_profile_avatar') } />
                <AvatarUpload />
            </div>
        )
    }
}

export default localize(ProfileAvatar, 'locale');
