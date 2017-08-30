import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { localize } from 'react-localize-redux';

import { userAvatarUpdateState } from 'features/user/actions';

import PageHeader from 'app/components/PageHeader';
import AvatarUpload from 'features/user/components/Profile/AvatarUpload';

import { getProfileAvatar } from 'app/services/PhotoService';
import LangService from 'app/services/LangService';
import * as lang from 'features/user/lang/Profile/ProfileAvatar.locale.json';

class ProfileAvatar extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const { translate, userAvatarUpdateState } = this.props,
            avatar = getProfileAvatar(this.props.avatar);

        return (
            <div>
                <PageHeader header={ translate('profile_avatar.change_profile_avatar') } />
                <AvatarUpload
                    avatarCurrent={avatar}
                    updateAvatarSuccess={userAvatarUpdateState}
                />
            </div>
        )
    }
}

const ProfileAvatarConnected = connect(
    state => ({
        avatar: state.user.profile.avatar,
    }),
    (dispatch) =>
        bindActionCreators({ userAvatarUpdateState }, dispatch)
)(ProfileAvatar);

export default localize(ProfileAvatarConnected, 'locale');
