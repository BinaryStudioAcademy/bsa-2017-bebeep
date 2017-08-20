import React from 'react';
import validate from 'validate.js';
import _ from 'lodash';
import {localize} from 'react-localize-redux';
import * as lang from '../../lang/_Modals/StatusModal.locale.json';

import LangService from 'app/services/LangService';
import Modal from 'app/components/Modal';

class StatusModal extends React.Component {

    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
        };
    }

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    componentWillReceiveProps(newProps) {
        if (this.state.modalIsOpen !== newProps.isOpen) {
            this.setState({
                modalIsOpen: newProps.isOpen
            });
        }
    }

    getMessage() {
        let message = this.props.modal.msg;

        if (typeof message !== 'object') {
            return message;
        }

        message = _.values(message).map((msg, i) => {
            return (
                <li key={ i }>{ msg }</li>
            );
        });

        return (<ul className="list-unstyled">{ message }</ul>);
    }

    render() {
        const { modal, translate } = this.props;
        const { modalIsOpen } = this.state;
        const onClosed = this.props.onClosed || (() => {});
        const header = modal.status === 'success'
            ? translate('status_modal.success')
            : translate('status_modal.error');
        const classStatus = modal.status === 'success' ? 'success' : 'danger';

        return (
            <div>
                <Modal isOpen={ modalIsOpen } onClosed={() => { this.state.modalIsOpen = false; onClosed(); }}>
                    <div className={ "modal-header alert-" + classStatus }>{ header }!</div>
                    <div className="modal-body">{ this.getMessage() }</div>
                    <div className="modal-footer text-right">
                        <button className={ "btn btn-" + classStatus } role="button" onClick={(e) => {
                            this.setState({ modalIsOpen: false });
                        }}>{translate('status_modal.ok')}</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default localize(StatusModal, 'locale');
