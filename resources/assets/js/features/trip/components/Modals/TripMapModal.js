import React from 'react';
import PropTypes from 'prop-types';
import { localize } from 'react-localize-redux';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";

import TripDetailsService from 'features/trip/services/TripDetailsService';

const GoogleMapContainer = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={5}
        defaultCenter={{lat: 48.379433, lng: 31.1655799}}>
        {props.directions && <DirectionsRenderer directions={props.directions}/>}
    </GoogleMap>
));

class TripMapModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpenModal: false,
            directions: null
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    componentWillMount() {
        this.renderDirection(this.props.waypoints);
    }

    toggleModal() {
        this.setState({ isOpenModal: !this.state.isOpenModal });
    }

    renderDirection(routes) {
        TripDetailsService
            .getMapDestination(routes)
            .then((result) => this.setState({directions: result}));
    }

    render() {
        const { isOpenModal, directions } = this.state,
            { translate, waypoints, className, modalHeader } = this.props,
            startPoint = waypoints[0].from;

        return (
            <span>
                <span className={"link-style " + className} onClick={this.toggleModal}>
                    <i className="trip-detail-icon fa fa-road mr-2" aria-hidden="true" />
                    { translate('trip_details.route_map_link') }
                </span>
                <Modal className="trip-map-modal"
                    size="lg"
                    isOpen={isOpenModal}
                    toggle={this.toggleModal}
                >
                    <ModalHeader className="trip-map-modal__header" toggle={this.toggleModal}>
                        { modalHeader }
                        <i className="trip-detail-icon fa fa-road" aria-hidden="true" />
                    </ModalHeader>

                    <ModalBody className="p-0">
                        <div className="trip-map-modal__map-container">
                            <GoogleMapContainer
                                containerElement={
                                    <div className="h-100 ss" />
                                }
                                mapElement={
                                    <div className="h-100" />
                                }
                                center={startPoint}
                                directions={directions}
                            />
                        </div>
                    </ModalBody>
                </Modal>
            </span>
        );
    }
}

TripMapModal.PropTypes = {
    waypoints: PropTypes.array.isRequired
};

export default localize(TripMapModal, 'locale');
