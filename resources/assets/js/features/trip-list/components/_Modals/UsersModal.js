import React from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import { TripDetailsUsers } from 'features/trip/layouts';

import LangService from 'app/services/LangService';
import * as LangTripDetails from 'features/trip/lang/TripDetails.locale.json';

class UsersModal extends React.Component {

    componentWillMount() {
        LangService.addTranslation(LangTripDetails);
    }

    render() {
        const { translate, isOpen, onClick, tripId } = this.props;

        return (
            <Modal className="trip-map-modal"
               size="lg"
               isOpen={isOpen}
               toggle={onClick}
            >
                <ModalHeader className="trip-map-modal__header" toggle={onClick}>
                    <i className="trip-detail-icon fa fa-users mr-3" aria-hidden="true" />
                    { translate('trip_details.routes_passengers.header') }
                </ModalHeader>
                <ModalBody className="py-4 modal-body--min-height">
                    <TripDetailsUsers params={{ 'id': tripId }} />
                </ModalBody>
            </Modal>
        );
    }
}

export default connect(
    state => ({
        translate: getTranslate(state.locale)
    })
)(UsersModal);
