import React from 'react';
import { localize } from 'react-localize-redux';
import Modal from 'app/components/Modal';

class ReviewBookingModal extends React.Component {
    render() {
        const {translate} = this.props;

        return (
            <div>
                <Modal isOpen={this.props.isOpen} onClosed={this.props.onClose}>
                    <h1>Hello, Review!</h1>
                    <div className="modal-footer text-right">
                        <button className="btn btn-secondary" role="button" onClick={this.props.onClose}>Close</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default localize(ReviewBookingModal, 'locale');