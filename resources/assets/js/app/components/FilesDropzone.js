import React from 'react';
import Dropzone from 'react-dropzone';
import { localize } from 'react-localize-redux';

import LangService from 'app/services/LangService';
import * as lang from 'app/lang/FilesDropzone.locale.json';

import 'app/styles/files-dropzone.scss';

const MULTIPLE = false;
const FILE_MIME_TYPES = 'image/*';
const FILE_MAX_SIZE_MB = 10;
const FILE_MAX_SIZE_MULTIPLIER = 1024 * 1024;

const DROPZONE_ERROR = {
    max_size: 'files_dropzone.file_size_more_maximum',
    mime_type: 'files_dropzone.file_type_is_not_supported',
};

class FilesDropzone extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    constructor(props) {
        super(props);

        this.state = {
            fileMaxSize: this.props.fileMaxSizeMb * FILE_MAX_SIZE_MULTIPLIER,
        };

        this.onDropAccepted = this.onDropAccepted.bind(this);
        this.onDropRejected = this.onDropRejected.bind(this);
    }

    onDropAccepted(files) {
        const { onDropAcceptedCustom } = this.props,
            data = files.length === 1 ? files[0] : files;

        onDropAcceptedCustom(data);
    }

    onDropRejected(files) {
        const { translate, fileMaxSize, onDropRejectedCustom } = this.props;
        let error = translate(DROPZONE_ERROR.mime_type);

        if (files[0].size > fileMaxSize) {
            error = translate(DROPZONE_ERROR.max_size);
        }

        onDropRejectedCustom(error);
    }

    render() {
        const { fileMaxSize } = this.state,
            {
                translate,
                multiple,
                fileMimeTypes,
                fileMaxSizeMb,
                customRules,
            } = this.props;

        return (
            <Dropzone
                multiple={ multiple }
                accept={ fileMimeTypes }
                maxSize={ fileMaxSize }
                onDropAccepted={ this.onDropAccepted }
                onDropRejected={ this.onDropRejected }
                className="files-dropzone noselect"
                activeClassName="files-dropzone--active"
                acceptClassName="files-dropzone--accert"
                rejectClassName="files-dropzone--reject"
                ref={ (dropzone) => { this.dropzone = dropzone; } }
            >
                <p className="files-dropzone__icon">
                    <i className="fa fa-3x fa-download" aria-hidden="true" />
                </p>
                <p className="files-dropzone__label">
                    { translate('files_dropzone.drop_or_click_to_select_file_to_upload') }
                </p>
                <p className="files-dropzone__rules">
                    <span>{ customRules }</span>
                    <span className="ml-2">
                        { translate('files_dropzone.rule_max_size_mb', {
                            size: fileMaxSizeMb
                        }) }
                    </span>
                </p>
            </Dropzone>
        );
    }
}

FilesDropzone.defaultProps = {
    multiple: MULTIPLE,
    fileMimeTypes: FILE_MIME_TYPES,
    fileMaxSizeMb: FILE_MAX_SIZE_MB,
};

export default localize(FilesDropzone, 'locale');
