import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import moment from 'moment';

import { EditButton, DeleteButton } from 'app/components/Buttons';
import BookingModal from './_Modals/BookingModal';
import UsersModal from './_Modals/UsersModal';
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
            modalIsOpen: false,
            modalUsersIsOpen: false,
        };

        this.onClick = this.onClick.bind(this);
        this.onClickPassengersBtn = this.onClickPassengersBtn.bind(this);
        this.deleteSelf = this.deleteSelf.bind(this);
        this.restoreSelf = this.restoreSelf.bind(this);
    }

    componentWillMount() {
        const { trip } = this.props,
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
            modalIsOpen: true,
        });
    }

    onClickPassengersBtn(e) {
        if (e !== undefined) {
            e.preventDefault();
        }

        this.setState({
            modalUsersIsOpen: !this.state.modalUsersIsOpen,
        });
    }

    getStartDate() {
        return moment(
            `${this.props.trip.start_at} +0000`,
            "YYYY-MM-DD HH:mm:ss Z"
        ).format('D MMMM HH:mm');
    }

    getStartPlace() {
        const { routes, trip } = this.props;

        if (_.isEmpty(trip.routes)) {
            return null;
        }

        return routes[trip.routes[0]].from;
    }

    getEndPlace() {
        const { routes, trip } = this.props;

        if (_.isEmpty(trip.routes)) {
            return null;
        }

        return routes[trip.routes[trip.routes.length - 1]].to;
    }

    deleteSelf() {
        securedRequest.delete('/api/v1/trips/' + this.props.trip.id)
            .then(() => {
                this.setState({
                    deletable: false,
                    editable: false,
                    isDeleted: true,
                });
            });
    }

    restoreSelf() {
        securedRequest.delete('/api/v1/trips/trash/' + this.props.trip.id)
            .then(() => {
                this.setState({
                    deletable: this.props.deletable,
                    editable: this.props.editable,
                    isDeleted: false,
                });
            });
    }

    getCurrencySign() {
        const { currency_id } = this.props.trip,
            { currencies } = this.props.currency,
            currencyItem = currencies.filter((item) => item.id === currency_id);

        return currencyItem[0] ? currencyItem[0].sign : '$';
    }

    render() {
        const { translate, routes, trip, bookings, vehicles } = this.props,
            { modalIsOpen, modalUsersIsOpen} = this.state;

        const startPlace = this.getStartPlace(),
            endPlace = this.getEndPlace(),
            startDate = this.getStartDate(),
            waypoints = getWaypointsFromRoutes(_.reduce(trip.routes, (arr, id) => {
                arr.push(routes[id]);
                return arr;
            }, []));

        const arBookings = _.reduce(trip.bookings, (arr, id) => {
            arr.push(bookings[id]);
            return arr;
        }, []);

        const bookingCount = BookingService.getBookingsCount(arBookings),
            currencySign = this.getCurrencySign();

        return (
            <div className={'col-sm-4 trip-card ' +
                (this.state.isDeleted ? 'trip-card--deleted' : '')
            }>
                {startPlace ? (
                    <DirectionsMap
                        show={false}
                        title={startDate}
                        bookingCount={bookingCount}
                        onClickBooking={this.onClick}
                        needDirection="1"
                        endTime={() => {}}
                        from={startPlace.geometry.location}
                        to={endPlace.geometry.location}
                        fromData={startPlace}
                        toData={endPlace}
                        waypoints={waypoints}
                    >
                        <div className="card-block trip-card-info trip-card-info--last">
                            <dl className="row trip-card-info__list">
                                <dt className="col-sm-4 trip-card-info__list-option">
                                    {translate('trip_list.car')}</dt>

                                <dd className="col-sm-8 trip-card-info__list-value">
                                    {vehicles[trip.vehicle].brand}</dd>

                                <dt className="col-sm-4 trip-card-info__list-option">
                                    {translate('trip_list.price')}</dt>

                                <dd className="col-sm-8 trip-card-info__list-value">
                                    {currencySign}&nbsp;{trip.price}
                                </dd>

                                <dt className="col-sm-4 trip-card-info__list-option">
                                    {translate('trip_list.seats')}</dt>

                                <dd className="col-sm-8 trip-card-info__list-value">
                                    {trip.seats}</dd>
                            </dl>

                            <div className="trip-card-info__passengers-link">
                                <a href="#" onClick={this.onClickPassengersBtn}>
                                    <i className="trip-detail-icon fa fa-user mr-2"
                                        aria-hidden="true" />
                                    {translate('trip_list.passengers_link')}
                                </a>
                            </div>
                        </div>

                        <div className="card-footer trip-card__actions">
                            {this.state.editable ? (
                                <EditButton pathTo={'/trip/edit/' + trip.id}
                                    className="trip-card__action-btn"
                                    title={translate('trip_list.tooltips.edit')}
                                />
                            ) : null}

                            {this.state.deletable ? (
                                <DeleteButton onClick={this.deleteSelf}
                                    className="trip-card__action-btn"
                                    title={translate('trip_list.tooltips.delete')}
                                />
                            ) : null}

                            {this.state.isDeleted ? (
                                <span>
                                    { translate('trip_list.deleted_successfully') }
                                    <button onClick={this.restoreSelf}
                                        className="btn btn-primary hover ml-3"
                                    >
                                        { translate('trip_list.restore') }
                                    </button>
                                </span>
                            ) : null}
                        </div>
                    </DirectionsMap>
                ) : null}

                <BookingModal bookings={ arBookings }
                    count={ bookingCount }
                    tripId={ trip.id }
                    isOpen={ modalIsOpen }
                    onClosed={ () => this.setState({modalIsOpen: false}) }
                />
                <UsersModal
                    tripId={ trip.id }
                    isOpen={ modalUsersIsOpen }
                    onClick={this.onClickPassengersBtn}
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
        currency: state.currency,
    })
)(Trip);
