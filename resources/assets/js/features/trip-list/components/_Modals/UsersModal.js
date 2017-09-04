import React from 'react';
import { connect } from 'react-redux';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import {TripDetailsUsers} from '../../../trip/layouts';
import { getTranslate } from 'react-localize-redux';

class UsersModal extends React.Component {

    render() {

        const {translate, isOpen, onClick, tripId} = this.props;

        return (
            <span>

                <Modal className="trip-map-modal"
                       size="lg"
                       isOpen={isOpen}
                       toggle={onClick}
                >
                    <ModalHeader className="trip-map-modal__header" toggle={onClick}>
                        {translate('trip_list.passengers_link')}
                        <i className="trip-detail-icon fa fa-users" aria-hidden="true"/>
                    </ModalHeader>
                    <ModalBody className="p-0">
                        <TripDetailsUsers params={{'id':tripId}}/>
                    </ModalBody>
                </Modal>
            </span>
        )
    }
}

export default connect(
    state => ({
        translate: getTranslate(state.locale)
    })
)(UsersModal);
