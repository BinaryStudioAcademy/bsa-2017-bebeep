import React, { Component } from 'react';

import PageHeader from '../../../../app/components/PageHeader';
import AvatarUpload from '../../components/Profile/AvatarUpload';
import LangService from '../../../../app/services/LangService';
import * as lang from '../../lang/Profile/ProfileAvatar.locale.json';
import {localize} from 'react-localize-redux';

class ProfileAvatar extends Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate} = this.props;
        return (
            <div>
                <PageHeader header={ translate('change_profile_avatar') } />
                <AvatarUpload />
            </div>
        )
    }
}

export default localize(ProfileAvatar, 'locale');
