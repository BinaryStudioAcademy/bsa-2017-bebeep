import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getTranslate} from 'react-localize-redux';

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
        const {routes, trip} = this.props;
        if (_.isEmpty(trip.routes)) {
            return null;
        }

        return routes[trip.routes[0]].from;
    }

    getEndPlace() {
        const {routes, trip} = this.props;
        if (_.isEmpty(trip.routes)) {
            return null;
        }

        return routes[trip.routes[trip.routes.length - 1]].to;
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
        const {translate, routes, trip, bookings, vehicles} = this.props;
        const startPlace = this.getStartPlace();
        const endPlace = this.getEndPlace();
        const startDate = this.getStartDate();
        const waypoints = getWaypointsFromRoutes(_.reduce(trip.routes, (arr, id) => {
            arr.push(routes[id]);
            return arr;
        }, []));
        const { modalIsOpen } = this.state;
        const arBookings = _.reduce(trip.bookings, (arr, id) => {
            arr.push(bookings[id]);
            return arr;
        }, []);
        const bookingCount = BookingService.getBookingsCount(arBookings);

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
                                <span className="text-muted"><strong>{translate('trip_list.car')}:</strong> {vehicles[trip.vehicle].brand}</span><br/>
                                <span className="text-muted"><strong>{translate('trip_list.price')}:</strong> ${trip.price}</span><br/>
                                <span className="text-muted"><strong>{translate('trip_list.seats')}:</strong> {trip.seats}</span><br/>
                            </div>
                        </div>
                        <div className="card-footer trip-actions">
                            {this.state.editable ? (
                                <Link to={'/trip/edit/' + trip.id} className="btn btn-primary">{translate('trip_list.edit')}</Link>
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

                <BookingModal bookings={ arBookings }
                              count={ bookingCount }
                              tripId={ trip.id }
                              isOpen={ modalIsOpen }
                              onClosed={ () => this.state.modalIsOpen = false } />
            </div>
        )
    }
}

export default connect(
    state => ({
        translate: getTranslate(state.locale),
        vehicles: state.tripList.vehicles,
        routes: state.tripList.routes,
        bookings: state.tripList.bookings,
    })
)(Trip);
