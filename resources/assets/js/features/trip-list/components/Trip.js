import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import moment from 'moment';

import BookingModal from './_Modals/BookingModal';
import DirectionsMap from "app/components/DirectionsMap";

import { securedRequest } from 'app/services/RequestService';
import BookingService from 'app/services/BookingService';
import { getWaypointsFromRoutes } from 'app/services/GoogleMapService';

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

    componentWillMount() {
        const {trip} = this.props,
            location = browserHistory.getCurrentLocation(),
            tripId = location.query['booking_trip'];

        if (trip.id == tripId && trip.bookings.length > 0) {
            delete(location.query['booking_trip']);
            browserHistory.replace(location);
            this.setState({modalIsOpen: true});
        }
    }

    onClick() {
        this.setState({
            modalIsOpen: true
        });
    }

    getStartDate() {
        return moment(
            `${this.props.trip.start_at} +0000`,
            "YYYY-MM-DD HH:mm:ss Z"
        ).format('D MMMM HH:mm');
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
        const { translate, routes, trip, bookings, vehicles } = this.props;

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
                                   show={false}
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
                                <Link to={'/trip/edit/' + trip.id} className="btn btn-primary mr-3">
                                    { translate('trip_list.edit') }
                                </Link>
                            ) : ''}

                            {this.state.deletable ? (
                                <button onClick={this.deleteSelf.bind(this)}
                                    className="btn btn-danger hover"
                                >
                                    { translate('trip_list.delete') }
                                </button>
                            ) : ''}

                            {this.state.isDeleted ? (
                                <span>
                                    { translate('trip_list.deleted_successfully') }
                                    <button onClick={this.restoreSelf.bind(this)}
                                        className="btn btn-default hover ml-3"
                                    >
                                        { translate('trip_list.restore') }
                                    </button>
                                </span>
                            ) : ''}
                        </div>
                    </DirectionsMap>
                ) : (<span>&nbsp;</span>)}

                <BookingModal bookings={ arBookings }
                    count={ bookingCount }
                    tripId={ trip.id }
                    isOpen={ modalIsOpen }
                    onClosed={ () => this.setState({modalIsOpen: false}) }
                />
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
