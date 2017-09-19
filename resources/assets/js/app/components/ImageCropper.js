import React from 'react';
import Cropper from 'react-cropper';

import 'app/styles/react-cropper.scss';
import 'app/styles/image-cropper.scss';

const ASPECT_RATIO = 1 / 1;
const AUTOCROP_AREA = .8;
const VIEW_MODE = 1;
const ROTATE_DIRECTION_LEFT = 'left';
const ROTATE_DIRECTION_RIGHT = 'right';

class ImageCropper extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            toggleShow: this.props.toggleShow || false,
        };

        this.onInitCropper = this.onInitCropper.bind(this);
        this.rotateImage = this.rotateImage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const newToggleShow = nextProps.toggleShow;

        if (this.props.toggleShow !== newToggleShow) {
            this.toggleShow(newToggleShow);
        }
    }

    onInitCropper(cropper) {
        this.cropper = cropper;
    }

    toggleShow(toggle) {
        toggle ? this.cropper.enable() : this.cropper.disable();

        this.setState({
            toggleShow: toggle,
        });
    }

    toggleClassShow() {
        return !this.state.toggleShow ? ' hide' : '';
    }

    rotateImage(direction) {
        const degree = direction === ROTATE_DIRECTION_LEFT ? -90 : 90;
        this.cropper.rotate(degree);
    }

    cropImage(options) {
        const { destWidth, destHeight } = this.props,
            { mimeType } = options;

        return this.cropper.getCroppedCanvas({
            width: destWidth,
            height: destHeight,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: 'high',
        }).toDataURL(mimeType);
    }

    reset() {
        this.cropper.reset();
    }

    render() {
        const { toggleShow } = this.state,
            { image, destWidth, destHeight, aspectRatio, autoCropArea } = this.props,
            classShow = this.toggleClassShow();

        return (
            <div className="d-flex">
                <div className={ "image-cropper__cropper-wrapper" + classShow }>
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
                        <button role="button"
                            className="btn image-cropper__btn-image-rotate"
                            onClick={ () => this.rotateImage(ROTATE_DIRECTION_LEFT) }
                            disabled={ !toggleShow }
                        >
                            <i className="image-cropper__btn-image-rotate-icon fa fa-undo"
                                aria-hidden="true" />
                        </button>
                        <button role="button"
                            className="btn image-cropper__btn-image-rotate"
                            onClick={ () => this.rotateImage(ROTATE_DIRECTION_RIGHT) }
                            disabled={ !toggleShow }
                        >
                            <i className="image-cropper__btn-image-rotate-icon fa fa-repeat"
                                aria-hidden="true" />
                        </button>
                    </div>
                </div>

                <div className={ "image-cropper__preview-wrapper" + classShow }>
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
