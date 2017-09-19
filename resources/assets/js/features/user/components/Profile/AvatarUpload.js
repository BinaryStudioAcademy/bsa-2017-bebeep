import React from 'react';
import { localize } from 'react-localize-redux';

import FilesDropzone from 'app/components/FilesDropzone';
import ImageCropper from 'app/components/ImageCropper';
import AvatarCurrent from './AvatarCurrent';

import UserService from 'features/user/services/UserService';

const AVATAR_SIZE = 150;
const AVATAR_MIME_TYPES = 'image/jpeg,image/png';
const AVATAR_MAX_SIZE_MB = 10;

const DROPZONE_VIEW_MODE = 'dropzone';
const CROPPER_VIEW_MODE = 'cropper';

class AvatarUpload extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            viewMode: DROPZONE_VIEW_MODE,
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
            viewMode: CROPPER_VIEW_MODE,
        });
    }

    toggleShow() {
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

    render() {
        const { image } = this.state,
            { translate, avatarCurrent, isDefaultAvatar } = this.props,
            toggleShow = this.toggleShow(),
            classShow = this.toggleClassShow();

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <FilesDropzone
                            fileMimeTypes={ AVATAR_MIME_TYPES }
                            fileMaxSizeMb={ AVATAR_MAX_SIZE_MB }
                            onDropAcceptedCustom={ this.onDropAccepted }
                            onDropRejectedCustom={ this.onDropRejected }
                            customRules={ translate('profile_avatar.custom_rules') }
                        />

                        <div className={ "mt-3 text-right" + classShow }>
                            <button
                                className="image-cropper__btn btn btn-primary"
                                onClick={ this.onAvatarSave }
                                disabled={ !toggleShow }
                            >
                                { translate('profile_avatar.save_avatar') }
                            </button>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <ImageCropper
                            image={ image.preview }
                            destWidth={ AVATAR_SIZE }
                            destHeight={ AVATAR_SIZE }
                            toggleShow={ toggleShow }
                            ref={ cropper => { this.onInitCropper(cropper); } }
                        />
                    </div>
                </div>

                <div className="mt-5">
                    <AvatarCurrent
                        avatar={ avatarCurrent }
                        destWidth={ AVATAR_SIZE }
                        isDefault={ isDefaultAvatar }
                        onDelete={ this.onDelete }
                    />
                </div>
            </div>
        );
    }
}

export default localize(AvatarUpload, 'locale');
