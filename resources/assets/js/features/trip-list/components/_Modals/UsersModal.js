import React from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import {TripDetailsUsers} from '../../../trip/layouts';

import 'features/trip-list/styles/booking-info.scss';


class UsersModal extends React.Component {

    render() {
        const {isOpen, onClick, tripId} = this.props;

        return (
            <span>

                <Modal className="trip-map-modal"
                       size="lg"
                       isOpen={isOpen}
                       toggle={onClick}
                >
                    <ModalHeader className="trip-map-modal__header" toggle={onClick}>
                        Passengers in this trip
                        <i className="trip-detail-icon fa fa-road" aria-hidden="true"/>
                    </ModalHeader>
                    <ModalBody className="p-0">
                        <TripDetailsUsers params={{'id':tripId}}/>
                    </ModalBody>
                </Modal>
            </span>
        )
    }
}

export default (UsersModal);
