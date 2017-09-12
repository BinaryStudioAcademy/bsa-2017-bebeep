import React from 'react';
import { localize } from 'react-localize-redux';
import Modal from 'app/components/Modal';

class ConfirmLoginModal extends React.Component {
    render() {
        const {translate} = this.props;

        return (
            <div>
                <Modal isOpen={this.props.isOpen} onClosed={this.props.onClosed}>
                    <div className="modal-header">
                        <h5 className="modal-title">{translate('confirm_login.confirm')}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.onClosed}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{translate('confirm_login.message')}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary">{translate('confirm_login.btn_yes')}</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.onClosed}>{translate('confirm_login.btn_no')}</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default localize(ConfirmLoginModal, 'locale');