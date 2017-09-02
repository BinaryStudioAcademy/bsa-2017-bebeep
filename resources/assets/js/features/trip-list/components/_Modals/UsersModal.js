import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTranslate } from 'react-localize-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import 'features/trip-list/styles/booking-info.scss';


class UsersModal extends React.Component {

    constructor() {
        super();
        this.state = {
            isOpenModal: false,
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({ isOpenModal: !this.state.isOpenModal });
    }

    componentWillReceiveProps(newProps) {
        if (this.state.isOpenModal !== newProps.isOpen) {
            this.setState({
                isOpenModal: newProps.isOpen
            });
        }
    }

    render() {
        const { isOpenModal } = this.state;

        return (
            <span>

                <Modal className="trip-map-modal"
                       size="lg"
                       isOpen={isOpenModal}
                       toggle={this.toggleModal()}
                >
                    <ModalHeader className="trip-map-modal__header" toggle={this.toggleModal()}>
                        Passengers in this trip
                        <i className="trip-detail-icon fa fa-road" aria-hidden="true" />
                    </ModalHeader>

                    <ModalBody className="p-0">
                        <div className="trip-map-modal__map-container">
                            There will be users!
                        </div>
                    </ModalBody>
                </Modal>
            </span>
        )
    }
}

export default (UsersModal);
