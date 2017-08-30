import React from 'react';
import Cropper from 'react-cropper';

import 'app/styles/react-cropper.scss';
import 'app/styles/image-cropper.scss';

const ASPECT_RATIO = 1 / 1;
const AUTOCROP_AREA = .8;
const VIEW_MODE = 1;

class ImageCropper extends React.Component {

    constructor(props) {
        super(props);

        this.onInitCropper = this.onInitCropper.bind(this);
        this.imageRotate = this.imageRotate.bind(this);
    }

    onInitCropper(cropper) {
        this.cropper = cropper;
    }

    toggleCropperShow() {
        return this.props.isHide ? ' hide' : '';
    }

    imageRotate(direction) {
        const degree = direction === 'left' ? -90 : 90;
        this.cropper.rotate(degree);
    }

    imageCrop(options) {
        const { destWidth, destHeight } = this.props,
            { mimeType } = options;

        return this.cropper.getCroppedCanvas({
            width: destWidth,
            height: destHeight,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high',
        }).toDataURL(mimeType);
    }

    render() {
        const { image, destWidth, destHeight, aspectRatio, autoCropArea } = this.props,
            toggleShow = this.toggleCropperShow();

        return (
            <div className="d-flex">
                <div className={ "image-cropper__cropper-wrapper" + toggleShow }>
                    <Cropper
                        src={ image }
                        aspectRatio={ aspectRatio }
                        autoCropArea={ autoCropArea }
                        viewMode={ VIEW_MODE }
                        className="image-cropper__base-cropper"
                        preview=".image-cropper__image-preview"
                        ref={ cropper => { this.onInitCropper(cropper) } }
                    />
                    <div className="image-cropper__buttons-rotate">
                        <button className="btn image-cropper__btn-image-rotate"
                                onClick={ () => this.imageRotate('left') }>
                            <i className="image-cropper__btn-image-rotate-icon fa fa-undo"
                                aria-hidden="true" />
                        </button>

                        <button className="btn image-cropper__btn-image-rotate"
                                onClick={ () => this.imageRotate('right') }>
                            <i className="image-cropper__btn-image-rotate-icon fa fa-repeat"
                                aria-hidden="true" />
                        </button>
                    </div>
                </div>

                <div className={ "image-cropper__preview-wrapper  " }>
                    <div className="image-cropper__image-preview"
                        style={{ width: destWidth, height: destHeight }} />
                </div>
            </div>
        );
    }
}

ImageCropper.defaultProps = {
    aspectRatio: ASPECT_RATIO,
    autoCropArea: AUTOCROP_AREA,
};

export default ImageCropper;
