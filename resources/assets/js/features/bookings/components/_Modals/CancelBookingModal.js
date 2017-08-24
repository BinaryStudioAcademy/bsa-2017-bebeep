import React from 'react';
import { localize } from 'react-localize-redux';
import Modal from 'app/components/Modal';

class CancelBookingModal extends React.Component {
    render() {
        const {translate} = this.props;

        return (
            <div>
                <Modal isOpen={this.props.isOpen} onClosed={this.props.onClose}>
                    <div className="modal-header"><span>{translate('bookings_list.cancel_modal_header')}?</span></div>
                    <div className="modal-footer text-right">
                        <button className="btn btn-secondary" role="button" onClick={this.props.onClose}>{translate('bookings_list.no')}</button>
                        <button className="btn btn-booking" role="button" onClick={this.props.onSubmit}>{translate('bookings_list.yes')}</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default localize(CancelBookingModal, 'locale');