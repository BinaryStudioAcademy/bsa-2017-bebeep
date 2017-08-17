import React, { Component } from 'react';
import validate from 'validate.js';
import _ from 'lodash';

import Modal from 'app/components/Modal';

class StatusModal extends Component {

    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
        };
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
        const { modal } = this.props;
        const { modalIsOpen } = this.state;
        const onClosed = this.props.onClosed || (() => {});
        const header = modal.status === 'success' ? 'Success' : 'Error';
        const classStatus = modal.status === 'success' ? 'success' : 'danger';

        return (
            <div>
                <Modal isOpen={ modalIsOpen } onClosed={() => { this.state.modalIsOpen = false; onClosed(); }}>
                    <div className={ "modal-header alert-" + classStatus }>{ header }!</div>
                    <div className="modal-body">{ this.getMessage() }</div>
                    <div className="modal-footer text-right">
                        <button className={ "btn btn-" + classStatus } role="button" onClick={(e) => {
                            this.setState({ modalIsOpen: false });
                        }}>Ok</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default StatusModal;
