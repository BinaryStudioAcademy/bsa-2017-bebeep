import React from 'react';
import { localize } from 'react-localize-redux';
import Modal from 'app/components/Modal';

class ConfirmLoginModal extends React.Component {
    render() {
        const {translate} = this.props;

        return (
            <div>
                <Modal isOpen={this.props.isConfirmLoginModalOpen} onClosed={this.props.isConfirmLoginModalClose}>
                    <div className="modal-header"><span>Email confirm login modal</span></div>
                    <div className="modal-footer text-right">
                        <button className="btn btn-secondary" role="button">no</button>
                        <button className="btn btn-booking" role="button">yes</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default localize(CancelBookingModal, 'locale');