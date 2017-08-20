import React from 'react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import {localize} from 'react-localize-redux';

import StatusModal from '../_Modals/StatusModal';
import UserService from 'features/user/services/UserService';

import 'app/styles/react-cropper.scss';
import 'app/styles/image-cropper.scss';

const AVATAR_WIDTH = 100;
const AVATAR_HEIGHT = 100;
const AVATAR_MIME_TYPES = 'image/*';
const AVATAR_MAX_SIZE_HUMAN = 10;
const AVATAR_MAX_SIZE = 1024 * 1024 * AVATAR_MAX_SIZE_HUMAN;

const DROPZONE_ERROR = {
    max_size: 'file_size_more_maximum',
    mime_type: 'file_type_is_not_supported',
};

const MODAL_MSG = {
    success: 'user_profile_avatar_successfully_updated',
};

class AvatarUpload extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            imageCurrent: null,
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
        this.imageRotate = this.imageRotate.bind(this);
        this.onImageSave = this.onImageSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentWillMount() {
        UserService.getProfileAvatar()
            .then(response => {
                this.setState({
                    imageCurrent: response.avatar,
                });
            })
            .catch(error => {});
    }

    onDropAccepted(files) {
        this.setState({
            image: {
                file: files[0],
                preview: files[0].preview,
            },
        });
    }

    onDropRejected(files) {
        const {translate} = this.props;
        if (files[0].size > AVATAR_MAX_SIZE) {
            this.setState({
                modal: {
                    isOpen: true,
                    status: 'error',
                    msg: translate(DROPZONE_ERROR.max_size),
                }
            });
            return;
        }
        this.setState({
            modal: {
                isOpen: true,
                status: 'error',
                msg: translate(DROPZONE_ERROR.mime_type),
            }
        });
    }

    imageRotate(direction) {
        const degree = direction === 'left' ? -90 : 90;
        this.cropper.rotate(degree);
    }

    imageCrop() {
        const imageType = this.state.image.file.type;

        return this.cropper.getCroppedCanvas({
            width: AVATAR_WIDTH,
            height: AVATAR_HEIGHT,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high',
        }).toDataURL(imageType);
    }

    onImageSave() {
        const {translate} = this.props;
        const updatedData = {
            'avatar': this.imageCrop(),
        };

        UserService.updateProfileAvatar(updatedData)
            .then(response => {
                this.setState({
                    imageCurrent: response.avatar,
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
                this.setState({
                    imageCurrent: null,
                    image: {
                        file: null,
                        preview: null,
                    },
                });
            })
            .catch(error => {});
    }

    render() {
        const { image, imageCurrent, modal } = this.state;
        const {translate} = this.props;
        const cropperHide = null === image.preview ? ' hide' : '';
        const currentHide = null === imageCurrent ? ' hide' : '';

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <Dropzone
                            accept={ AVATAR_MIME_TYPES }
                            maxSize={ AVATAR_MAX_SIZE }
                            className="image-cropper__dropzone noselect"
                            activeClassName="image-cropper__dropzone--active"
                            acceptClassName="image-cropper__dropzone--accert"
                            rejectClassName="image-cropper__dropzone--reject"
                            multiple={ false }
                            onDropAccepted={ this.onDropAccepted }
                            onDropRejected={ this.onDropRejected }
                            ref={ (dropzone) => { this.dropzone = dropzone; } }
                        >
                            <p className="image-cropper__dropzone-icon">
                                <i className="fa fa-3x fa-user-circle-o" aria-hidden="true" />
                            </p>
                            <p>{translate('drop_image_or_click_to_select_file_to_upload')}</p>
                            <p className="image-cropper__dropzone-rules">
                                {translate('only_image_max_mb', {size: AVATAR_MAX_SIZE_HUMAN})}
                            </p>
                        </Dropzone>
                    </div>

                    <div className="col-5">
                        <div className={ "image-cropper__cropper-wrapper" + cropperHide }>
                            <Cropper
                                className="image-cropper__base-cropper"
                                src={ image.preview }
                                aspectRatio={ 1 / 1 }
                                autoCropArea={ .8 }
                                preview=".image-cropper__image-preview"
                                viewMode={ 1 }
                                ref={ (cropper) => { this.cropper = cropper; } }
                            />
                            <div className="image-cropper__buttons-rotate">
                                <button className="btn image-cropper__btn-image-rotate"
                                        onClick={ () => this.imageRotate('left') }>
                                    <i className="image-cropper__btn-image-rotate-icon fa fa-undo"
                                        aria-hidden="true"></i>
                                </button>

                                <button className="btn image-cropper__btn-image-rotate"
                                        onClick={ () => this.imageRotate('right') }>
                                    <i className="image-cropper__btn-image-rotate-icon fa fa-repeat"
                                        aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-2">
                        <div className={ "image-cropper__preview-wrapper" + cropperHide }>
                            <div className="image-cropper__image-preview"
                                style={{ width: AVATAR_WIDTH, height: AVATAR_HEIGHT }} />

                            <button className="image-cropper__btn btn btn-primary"
                                    onClick={ this.onImageSave }>
                                {translate('save_avatar')}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={ "row mt-4" + currentHide }>
                    <div className="col-12">
                        <div className="user-current-avatar">
                            <figure className="user-current-avatar__block">
                                <figcaption className="user-current-avatar__caption">
                                    {translate('current_avatar')}
                                </figcaption>
                                <img src={ imageCurrent } alt={translate('user_current_avatar')}/>
                            </figure>
                            <div>
                                <button className="image-cropper__btn btn btn-danger"
                                        onClick={ this.onDelete }>
                                    {translate('delete_avatar')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <StatusModal modal={ modal } isOpen={ modal.isOpen }
                    onClosed={ () => this.state.modal.isOpen = false } />
            </div>
        )
    }
}

export default localize(AvatarUpload, 'locale');
