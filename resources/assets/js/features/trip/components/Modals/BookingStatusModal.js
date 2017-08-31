import React from 'react';
import { localize } from 'react-localize-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

class BookingStatusModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpenModal: false,
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (this.state.isOpenModal !== newProps.isOpen) {
            this.setState({ isOpenModal: newProps.isOpen });
        }
    }

    toggleModal() {
        this.setState({ isOpenModal: !this.state.isOpenModal });
        this.props.onClosed();
    }

    render() {
        const { isOpenModal } = this.state,
            { translate, message } = this.props;

        return (
            <Modal isOpen={ isOpenModal } toggle={ this.toggleModal }>
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
