import React from 'react';
import { localize } from 'react-localize-redux';

import FilesDropzone from 'app/components/FilesDropzone';
import ImageCropper from 'app/components/ImageCropper';
import AvatarCurrent from './AvatarCurrent';

import UserService from 'features/user/services/UserService';

const AVATAR_SIZE = 150;
const AVATAR_MIME_TYPES = 'image/jpeg,image/png';
const AVATAR_MAX_SIZE_MB = 10;

class AvatarUpload extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            image: {
                file: null,
                preview: null,
            },
        };

        this.onInitCropper = this.onInitCropper.bind(this);

        this.onDropAccepted = this.onDropAccepted.bind(this);
        this.onDropRejected = this.onDropRejected.bind(this);

        this.onAvatarSave = this.onAvatarSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.backToFileUpload = this.backToFileUpload.bind(this);
    }

    onInitCropper(cropper) {
        this.cropper = cropper;
    }

    setAvatarState(file) {
        file = file instanceof window.File ? file : null;
        const preview = file !== null ? file.preview : null;

        this.setState({
            image: {
                file: file,
                preview: preview,
            },
        });
    }

    backToFileUpload() {
        this.setAvatarState();
    }

    toggleShow(inverse) {
        if (inverse) {
            return this.state.image.file === null;
        }
        return this.state.image.file !== null;
    }

    toggleClassShow() {
        return !this.toggleShow() ? ' hide' : '';
    }

    onDropAccepted(file) {
        this.setAvatarState(file);
    }

    onDropRejected(error) {
        this.setAvatarState();
        this.props.setStatusModal({
            msg: error,
        });
    }

    cropAvatar() {
        const imageMimeType = this.state.image.file.type;

        return this.cropper.cropImage({
            mimeType: imageMimeType,
        });
    }

    onAvatarSave() {
        const { translate, setStatusModal } = this.props,
            data = { avatar: this.cropAvatar() };

        UserService.updateProfileAvatar(data)
            .then(response => {
                this.props.updateAvatarSuccess(response.avatar);
                this.cropper.reset();
            })
            .catch(error => {
                setStatusModal({
                    msg: error,
                });
            });
    }

    onDelete() {
        UserService.deleteProfileAvatar()
            .then(response => {
                this.props.updateAvatarSuccess(null);
                this.setAvatarState();
            });
    }

    renderFilesDropzone() {
        const { translate } = this.props,
            toggleShow = this.toggleShow(true);

        return (
            <FilesDropzone
                fileMimeTypes={ AVATAR_MIME_TYPES }
                fileMaxSizeMb={ AVATAR_MAX_SIZE_MB }
                onDropAcceptedCustom={ this.onDropAccepted }
                onDropRejectedCustom={ this.onDropRejected }
                toggleShow={toggleShow}
                customRules={ translate('profile_avatar.custom_rules') }
            />
        );
    }

    renderImageCropper() {
        const { image } = this.state,
            { translate } = this.props,
            toggleShow = this.toggleShow(),
            classShow = this.toggleClassShow();

        return (
            <div className={classShow}>
                <div className="user-profile-avatar__back-to-file-upload">
                    <button role="button"
                        className="btn btn-warning user-profile-avatar__back-to-file-upload-btn"
                        onClick={this.backToFileUpload}
                    >
                        {translate('profile_avatar.back_to_file_upload')}
                    </button>
                </div>
                <ImageCropper
                    image={ image.preview }
                    destWidth={ AVATAR_SIZE }
                    destHeight={ AVATAR_SIZE }
                    toggleShow={ toggleShow }
                    onImageSave={this.onAvatarSave}
                    imageSaveBtnName={translate('profile_avatar.save_avatar')}
                    ref={ cropper => { this.onInitCropper(cropper); } }
                />
            </div>
        );
    }

    render() {
        const { avatarCurrent, isDefaultAvatar } = this.props;

        return (
            <div className="container-fluid user-profile-avatar">
                <div className="row">
                    <div className="col-md-8">
                        {this.renderFilesDropzone()}
                        {this.renderImageCropper()}
                    </div>

                    <div className="col-md-4">
                        <AvatarCurrent
                            avatar={ avatarCurrent }
                            destWidth={ AVATAR_SIZE }
                            isDefault={ isDefaultAvatar }
                            onDelete={ this.onDelete }
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default localize(AvatarUpload, 'locale');
