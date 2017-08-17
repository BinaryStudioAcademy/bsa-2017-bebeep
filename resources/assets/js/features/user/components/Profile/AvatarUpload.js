import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';

import StatusModal from '../_Modals/StatusModal';
import UserService from '../../services/UserService';

import '../../../../app/styles/react-cropper.scss';
import '../../../../app/styles/image-cropper.scss';

const AVATAR_WIDTH = 100;
const AVATAR_HEIGHT = 100;
const MODAL_MSG = {
    success: 'User profile general data successfully updated!',
};

class AvatarUpload extends Component {

    constructor(props) {
        super(props);

        this.state = {
            image: {
                file: null,
                preview: null,
            },
            error: '',
            modal: {
                isOpen: false,
                status: '',
                msg: '',
            },
        };

        this.onImageDrop = this.onImageDrop.bind(this);
        this.imageRotate = this.imageRotate.bind(this);
        this.onImageSave = this.onImageSave.bind(this);
    }

    onImageDrop(files) {
        this.setState({
            image: {
                file: files[0],
                preview: files[0].preview,
            },
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
        }).toDataURL(imageType);
    }

    onImageSave() {
        const updatedData = {
            'avatar': this.imageCrop(),
        };

        UserService.updateProfileAvatar(updatedData)
            .then(response => {
                /*this.setState({
                    modal: {
                        isOpen: true,
                        status: 'success',
                        msg: MODAL_MSG.success,
                    }
                });*/
                console.log(response);
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

    render() {
        const { image, modal } = this.state;
        const classHide = null === image.preview ? ' hide' : '';

        return (
            <div className="row avatar-upload">
                <div className="col-4">
                    <Dropzone
                        className="image-cropper__dropzone noselect"
                        activeClassName="image-cropper__dropzone--active noselect"
                        multiple={ false }
                        accept="image/*"
                        onDrop={ this.onImageDrop }
                        ref={ (dropzone) => { this.dropzone = dropzone; } }
                    >
                        <p>Drop an image or click to select a file to upload.</p>
                    </Dropzone>
                </div>

                <div className="col-5">
                    <div className={ "image-cropper__cropper-wrapper" + classHide }>
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
                    <div className={ "image-cropper__preview-wrapper" + classHide }>
                        <div className="image-cropper__image-preview"
                            style={{ width: AVATAR_WIDTH, height: AVATAR_HEIGHT }} />

                        <button className="image-cropper__btn-save btn btn-primary"
                                onClick={ this.onImageSave }>
                            Save
                        </button>
                    </div>
                </div>

                <StatusModal modal={ modal } isOpen={ modal.isOpen }
                    onClosed={ () => this.state.modal.isOpen = false } />
            </div>
        )
    }
}

export default AvatarUpload;
