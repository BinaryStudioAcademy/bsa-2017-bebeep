import React from 'react';
import { localize } from 'react-localize-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

class BookingStatusModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (this.state.isOpen !== newProps.isOpen) {
            this.setState({ isOpen: newProps.isOpen });
        }
    }

    closeModal() {
        this.setState({ isOpen: !this.state.isOpen });
        this.props.onClosed();
    }

    toggleModal() {
        this.closeModal();
    }

    render() {
        const { isOpen } = this.state,
            { translate, message } = this.props;

        return (
            <Modal isOpen={ isOpen } toggle={ this.toggleModal }>
                <ModalHeader className="alert-success" toggle={ this.toggleModal }>
                    { translate('trip_details.booking.header') }
                </ModalHeader>

                <ModalBody>
                    <p>{ translate('trip_details.booking.status.success') }</p>
                </ModalBody>
            </Modal>
        );
    }
}

export default localize(BookingStatusModal, 'locale');
