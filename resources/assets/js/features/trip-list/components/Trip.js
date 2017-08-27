import React from 'react';
import moment from 'moment';
import {localize} from 'react-localize-redux';
import { Link } from 'react-router';

import DirectionsMap from "app/components/DirectionsMap";
import { securedRequest } from 'app/services/RequestService';
import { getWaypointsFromRoutes } from 'app/services/GoogleMapService';
import BookingService from 'app/services/BookingService';
import BookingModal from './_Modals/BookingModal';


import '../styles/trip-card.scss';

class Trip extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            deletable: this.props.deletable,
            editable: this.props.editable,
            isDeleted: false,
            modalIsOpen: false
        };
    }

    onClick() {
        this.setState({
            modalIsOpen: true
        });
    }

    getStartDate() {
        return moment(`${this.props.trip.start_at} +0000`, "YYYY-MM-DD HH:mm:ss Z").format('D MMMM HH:mm');
    }

    getStartPlace() {
        if (!this.props.trip.routes.data.length) {
            return null;
        }

        return this.props.trip.routes.data[0].from;
    }

    getEndPlace() {
        if (!this.props.trip.routes.data.length > 0) {
            return null;
        }

        return this.props.trip.routes.data[this.props.trip.routes.data.length - 1].to;
    }

    deleteSelf() {
        securedRequest.delete('/api/v1/trips/' + this.props.trip.id).then(() => {
            this.setState({
                deletable: false,
                editable: false,
                isDeleted: true
            });
        });
    }

    restoreSelf() {
        securedRequest.delete('/api/v1/trips/trash/' + this.props.trip.id).then(() => {
            this.setState({
                deletable: this.props.deletable,
                editable: this.props.editable,
                isDeleted: false
            });
        });
    }


    render() {
        const {translate} = this.props;
        const startPlace = this.getStartPlace();
        const endPlace = this.getEndPlace();
        const startDate = this.getStartDate();
        const waypoints = getWaypointsFromRoutes(this.props.trip.routes.data);
        const { modalIsOpen } = this.state;
        const bookings = this.props.trip.bookings.data;
        const bookingCount = BookingService.getBookingsCount(bookings);

        return (
            <div className={'col-sm-4 trip-item ' + (this.state.isDeleted ? 'deleted-trip' : '')}>
                {startPlace ? (
                    <DirectionsMap title={startDate}
                                   bookingCount={bookingCount}
                                   onClickBooking={this.onClick.bind(this)}
                                   needDirection="1"
                                   endTime={() => {}}
                                   from={startPlace.geometry.location}
                                   to={endPlace.geometry.location}
                                   waypoints={waypoints}
                    >
                        <div className="card-block">
                            <div className="card-text">
                                <span className="text-muted"><strong>{translate('trip_list.car')}:</strong> {this.props.trip.vehicle.data.brand}</span><br/>
                                <span className="text-muted"><strong>{translate('trip_list.price')}:</strong> ${this.props.trip.price}</span><br/>
                                <span className="text-muted"><strong>{translate('trip_list.seats')}:</strong> {this.props.trip.seats}</span><br/>
                            </div>
                        </div>
                        <div className="card-footer trip-actions">
                            {this.state.editable ? (
                                <Link to={'/trip/edit/' + this.props.trip.id} className="btn btn-primary">{translate('trip_list.edit')}</Link>
                            ) : (<span>&nbsp;</span>)}
                            {this.state.deletable ? (
                                <button onClick={this.deleteSelf.bind(this)} className="btn btn-danger hover">{translate('trip_list.delete')}</button>
                            ) : (<span>&nbsp;</span>)}
                            {this.state.isDeleted ? (
                                <span>{translate('trip_list.deleted_successfully')} &nbsp;<button onClick={this.restoreSelf.bind(this)} className="btn btn-default hover">{translate('trip_list.restore')}</button></span>
                            ) : (<span>&nbsp;</span>)}
                        </div>
                    </DirectionsMap>
                ) : (<span>&nbsp;</span>)}

                <BookingModal bookings={ bookings }
                              count={ bookingCount }
                              tripId={ this.props.trip.id }
                              isOpen={ modalIsOpen }
                              onClosed={ () => this.state.modalIsOpen = false } />
            </div>
        )
    }
}

export default localize(Trip, 'locale');
