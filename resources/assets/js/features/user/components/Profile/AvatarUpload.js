import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';

import '../../../../app/styles/react-cropper.scss';

class AvatarUpload extends Component {

    constructor(props) {
        super(props);

        this.state = {
            image: ''
        };

        this.onImageDrop = this.onImageDrop.bind(this);
        this.onImageCrop = this.onImageCrop.bind(this);
        this.imageRotate = this.imageRotate.bind(this);
    }

    imageRotate(e) {
        const degree = e.target.getAttribute('rotate') === 'left' ? -90 : 90;
        this.cropper.rotate(degree);
    }

    onImageDrop(files) {
        this.setState({
            image: files[0].preview
        });
    }

    onImageCrop() {
        //console.log(this.cropper.getCroppedCanvas().toDataURL());
    }

    handleImageUpload(file) {
        console.log(file);
    }

    render() {
        return (
            <div className="row avatar-upload">
                <div className="col-4">
                    <Dropzone
                        multiple={ false }
                        accept="image/*"
                        onDrop={ this.onImageDrop }
                        ref={ (dropzone) => { this.dropzone = dropzone; } }
                    >
                        <p>Drop an image or click to select a file to upload.</p>

                        {/*<button type="button" className="btn btn-primary"
                            onClick={ () => { this.dropzone.open() }}
                        >
                            Open File Dialog
                        </button>*/}
                    </Dropzone>
                </div>

                <div className="col-6">
                    <Cropper
                        src={ this.state.image }
                        style={ {height: 300, width: 300} }
                        aspectRatio={ 1 / 1 }
                        guides={ true }
                        preview=".img-preview"
                        autoCropArea={ 1 }
                        crop={ this.onImageCrop }
                        ref={ (cropper) => { this.cropper = cropper; } }
                    />
                    <div>
                        <button className="btn" rotate="left"
                                onClick={ this.imageRotate }>
                            <i className="fa fa-undo" aria-hidden="true"></i>
                        </button>

                        <button className="btn" rotate="right"
                                onClick={ this.imageRotate }>
                            <i className="fa fa-repeat" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>

                <div className="col-2">
                    <div className="img-preview"
                        style={{ width: 100, height: 100, overflow: "hidden" }}></div>
                </div>
            </div>
        )
    }
}

export default AvatarUpload;
