import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';

import '../../../../app/styles/react-cropper.scss';
import '../../../../app/styles/image-cropper.scss';

class AvatarUpload extends Component {

    constructor(props) {
        super(props);

        this.state = {
            image: null
        };

        this.onImageDrop = this.onImageDrop.bind(this);
        this.imageRotate = this.imageRotate.bind(this);
        this.onImageSave = this.onImageSave.bind(this);
    }

    onImageDrop(files) {
        this.setState({
            image: files[0].preview
        });
    }

    imageRotate(direction) {
        const degree = direction === 'left' ? -90 : 90;
        this.cropper.rotate(degree);
    }

    onImageSave() {
        const avatar = this.cropper.getCroppedCanvas().toDataURL();
        console.log(avatar);
    }

    render() {
        const { image } = this.state;
        const classHide = null === image ? ' hide' : '';

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
                    <div className={"image-cropper__cropper-wrapper" + classHide}>
                        <Cropper
                            className="image-cropper__base-cropper"
                            src={ image }
                            aspectRatio={ 1 / 1 }
                            autoCropArea={ .8 }
                            preview=".image-cropper__image-preview"
                            viewMode={ 1 }
                            ref={ (cropper) => { this.cropper = cropper; } }
                        />
                        <div className="image-cropper__buttons-rotate">
                            <button className="btn image-cropper__btn-image-rotate"
                                    onClick={ () => this.imageRotate('left') }>
                                <i className="image-cropper__btn-image-rotate-icon fa fa-undo" aria-hidden="true"></i>
                            </button>

                            <button className="btn image-cropper__btn-image-rotate"
                                    onClick={ () => this.imageRotate('right') }>
                                <i className="image-cropper__btn-image-rotate-icon fa fa-repeat" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-2">
                    <div className={"image-cropper__preview-wrapper" + classHide}>
                        <div className="image-cropper__image-preview"></div>

                        <button className="image-cropper__btn-save btn btn-primary"
                                onClick={ this.onImageSave }>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AvatarUpload;
