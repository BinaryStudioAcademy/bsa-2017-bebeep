import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { localize } from 'react-localize-redux';

import { userAvatarUpdateState } from 'features/user/actions';

import PageHeader from 'app/components/PageHeader';
import AvatarUpload from 'features/user/components/Profile/AvatarUpload';
import StatusModal from 'features/user/components/_Modals/StatusModal';

import { getProfileAvatar, isDefaultProfileAvatar } from 'app/services/PhotoService';
import LangService from 'app/services/LangService';
import * as lang from 'features/user/lang/Profile/ProfileAvatar.locale.json';

class ProfileAvatar extends React.Component {

     constructor(props) {
        super(props);

        this.state = {
            modal: {
                isOpen: false,
                status: 'error',
                msg: '',
            },
        };

        this.setStatusModal = this.setStatusModal.bind(this);
    }

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    setStatusModal(options) {
        const { status, msg } = options;

        this.setState({
            modal: {
                isOpen: true,
                status,
                msg,
            }
        });
    }

    render() {
        const { translate, avatar, userAvatarUpdateState } = this.props,
            { modal } = this.state,
            isDefaultAvatar = isDefaultProfileAvatar(avatar);

        return (
            <div>
                <PageHeader header={ translate('profile_avatar.change_profile_avatar') } />
                <AvatarUpload
                    avatarCurrent={ avatar }
                    isDefaultAvatar={ isDefaultAvatar }
                    updateAvatarSuccess={ userAvatarUpdateState }
                    setStatusModal={ this.setStatusModal }
                />

                <StatusModal
                    modal={ modal }
                    isOpen={ modal.isOpen }
                    onClosed={ () => this.state.modal.isOpen = false }
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
