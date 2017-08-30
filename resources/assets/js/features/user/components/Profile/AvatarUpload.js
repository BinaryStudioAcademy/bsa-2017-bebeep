import React from 'react';
import { localize } from 'react-localize-redux';

import FilesDropzone from 'app/components/FilesDropzone';
import ImageCropper from 'app/components/ImageCropper';
import AvatarCurrent from './AvatarCurrent';
import StatusModal from '../_Modals/StatusModal';

import UserService from 'features/user/services/UserService';

const AVATAR_WIDTH = 100;
const AVATAR_HEIGHT = 100;
const AVATAR_MIME_TYPES = 'image/*';
const AVATAR_MAX_SIZE_MB = 10;

const MODAL_MSG = {
    success: 'profile_avatar.user_profile_avatar_successfully_updated',
};

class AvatarUpload extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            image: {
                file: null,
                preview: null,
            },
            modal: {
                isOpen: false,
                status: '',
                msg: '',
            },
        };

        this.onDropAccepted = this.onDropAccepted.bind(this);
        this.onDropRejected = this.onDropRejected.bind(this);
        this.onInitCropper = this.onInitCropper.bind(this);

        this.onImageSave = this.onImageSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onInitCropper(cropper) {
        this.cropper = cropper;
    }

    shouldCropperBeHidden() {
        return this.state.image.preview === null;
    }

    onDropAccepted(file) {
        this.setState({
            image: {
                file: file,
                preview: file.preview,
            },
        });
    }

    onDropRejected(error) {
        this.setState({
            modal: {
                isOpen: true,
                status: 'error',
                msg: error,
            }
        });
    }

    imageCrop() {
        const imageMimeType = this.state.image.file.type;

        return this.cropper.imageCrop({
            mimeType: imageMimeType,
        });
    }

    onImageSave() {
        const { translate } = this.props,
            data = { avatar: this.imageCrop() };

        UserService.updateProfileAvatar(data)
            .then(response => {
                this.props.updateAvatarSuccess(response.avatar);
                this.setState({
                    modal: {
                        isOpen: true,
                        status: 'success',
                        msg: translate(MODAL_MSG.success),
                    }
                });
            })
            .catch(error => {
                this.setState({
                    modal: {
                        isOpen: true,
                        status: 'error',
                        msg: error,
                    }
                });
            });
    }

    onDelete() {
        UserService.deleteProfileAvatar()
            .then(response => {
                this.props.updateAvatarSuccess(null);
                this.setState({
                    image: {
                        file: null,
                        preview: null,
                    },
                });
            })
            .catch(error => {});
    }

    render() {
        const { image, modal } = this.state,
            { translate, avatarCurrent } = this.props;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <FilesDropzone
                            fileMimeTypes={ AVATAR_MIME_TYPES }
                            fileMaxSizeMb={ AVATAR_MAX_SIZE_MB }
                            onDropAcceptedCustom={ this.onDropAccepted }
                            onDropRejectedCustom={ this.onDropRejected }
                        />

                        <div className="mt-3 text-right">
                            <button
                                className="image-cropper__btn btn btn-primary"
                                onClick={ this.onImageSave }
                            >
                                { translate('profile_avatar.save_avatar') }
                            </button>
                        </div>
                    </div>

                    <div className="col-md-8">
                        <ImageCropper
                            image={ image.preview }
                            destWidth={ AVATAR_WIDTH }
                            destHeight={ AVATAR_HEIGHT }
                            isHide={ this.shouldCropperBeHidden() }
                            ref={ cropper => { this.onInitCropper(cropper); } }
                        />
                    </div>
                </div>

                <div className="mt-5">
                    <AvatarCurrent
                        avatar={ avatarCurrent }
                        onDelete={ this.onDelete }
                    />
                </div>

                <StatusModal
                    modal={ modal }
                    isOpen={ modal.isOpen }
                    onClosed={ () => this.state.modal.isOpen = false }
                />
            </div>
        )
    }
}

export default localize(AvatarUpload, 'locale');
