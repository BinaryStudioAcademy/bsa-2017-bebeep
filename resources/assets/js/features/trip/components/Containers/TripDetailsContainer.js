import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTranslate } from 'react-localize-redux';
import _ from 'lodash';

import BookingModal from '../Modals/BookingModal';
import DateTimeHelper from 'app/helpers/DateTimeHelper';

import AuthService from 'app/services/AuthService';
import { convertTripPrice, convertTripRoutesPrice } from 'app/services/TripService';
import { USER_ROLE_DRIVER } from 'app/services/UserService';

import {
    TripRoutesPassengers,
    TripBookingMainInfo,
    TripPassengersCurrent,
} from '../Details';
import {
    TripMainPoints,
    TripMainInfo,
    TripDriver,
    TripVehicle,
} from '../Details/Trip';
import { addBookingState } from 'features/trip/actions';

import 'features/trip/styles/trip_details.scss';


class TripDetailsContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpenBookingModal: false,
            hideBookingBtn: false,
            routes: [],
        };

        this.onBookingBtnClick = this.onBookingBtnClick.bind(this);
        this.onBookingSuccess = this.onBookingSuccess.bind(this);
        this.onBookingClosed = this.onBookingClosed.bind(this);
    }

    componentWillMount() {
        this.toggleBookingBtn(this.props);
        this.setTripRoutes();
    }

    componentWillReceiveProps(nextProps) {
        this.toggleBookingBtn(nextProps);
        this.setTripRoutes();
    }

    setTripRoutes() {
        const { trip, routes } = this.props.details;

        this.setState({
            routes: convertTripRoutesPrice(trip.currency_id, routes),
        });
    }

    toggleBookingBtn(props) {
        const { isOwner, hasBooking } = props.details,
            isDriverOnly = AuthService.checkPermissions(USER_ROLE_DRIVER, true);

        this.setState({hideBookingBtn: hasBooking || isOwner || isDriverOnly});
    }

    formatStartAt() {
        const translate = this.props.translate,
            trip = this.props.details.trip;

        trip.start_at_format = DateTimeHelper.dateFormatLocale({
            timestamp: trip.start_at_x,
            getTranslate: translate,
        });
    }

    onBookingBtnClick() {
        if (!this.state.hideBookingBtn) {
            this.setState({ isOpenBookingModal: true });
        }
    }

    onBookingSuccess() {
        this.props.addBookingState(true);
    }

    onBookingClosed() {
        this.setState({ isOpenBookingModal: false });
    }

    renderBookingButton() {
        const { translate } = this.props,
            { hideBookingBtn } = this.state;

        if (hideBookingBtn) {
            return null;
        }

        return (
            <div className="trip-booking-button p-3">
                <button
                    role="button"
                    className="btn trip-booking-button__btn py-3"
                    onClick={this.onBookingBtnClick}
                >
                    {translate('trip_details.booking_btn')}
                </button>
            </div>
        );
    }

    render() {
        const { translate, details: {trip, driver, vehicle}, activeCurrency } = this.props,
            { routes, isOpenBookingModal, isOpenBookingStatusModal } = this.state;

        const startPoint = routes[0].from,
            endPoint = _.last(routes).to,
            currentBookings = routes[0].bookings.data,
            currentFreeSeats = routes[0].free_seats;

        const tripPrice = convertTripPrice(trip);

        this.formatStartAt();

        return (
            <div className="row">
                <div className="col-12">
                    <TripMainPoints
                        startPoint={ startPoint.short_address }
                        endPoint={ endPoint.short_address }
                        waypoints={ routes }
                    />
                </div>
                <div className="col-lg-8">
                    <div className="block-border p-3">
                        <TripMainInfo
                            startPoint={ startPoint.address }
                            endPoint={ endPoint.address }
                            startAt={ trip.start_at_format }
                        />

                        <div className="row">
                            <div className="col-md-6 mt-4">
                                <TripDriver driver={ driver } />
                            </div>
                            <div className="col-md-6 mt-4">
                                <TripVehicle vehicle={ vehicle } />
                            </div>
                        </div>
                    </div>

                    <section className="block-border px-3 pt-3 pb-2 mt-4">
                        <header className="trip-section-header">
                            <i className="trip-detail-icon fa fa-users mr-3" aria-hidden="true" />
                            <h3 className="h5 d-inline-block">
                                { translate('trip_details.routes_passengers.header') }
                            </h3>
                        </header>

                        <TripRoutesPassengers
                            maxSeats={ trip.seats }
                            driver={ driver }
                            routes={ routes }
                        />
                    </section>
                </div>

                <div className="col-lg-4">
                    <div className="block-border text-center">

                        <TripBookingMainInfo
                            price={ tripPrice }
                            currencySign={ activeCurrency.sign }
                            freeSeats={ currentFreeSeats }
                        />
                        <TripPassengersCurrent
                            maxSeats={ trip.seats }
                            bookings={ currentBookings }
                            freeSeats={ currentFreeSeats }
                        />

                        { this.renderBookingButton() }
                    </div>
                </div>

                <BookingModal
                    tripId={ trip.id }
                    maxSeats={ trip.seats }
                    waypoints={ routes }
                    currencySign={ activeCurrency.sign }
                    startAt={ trip.start_at_format }
                    isOpen={ isOpenBookingModal }
                    onClosed={ this.onBookingClosed }
                    onSuccess={ this.onBookingSuccess }
                />
            </div>
        );
    }
}

export default connect(
    state => ({
        translate: getTranslate(state.locale),
        activeCurrency: state.currency.activeCurrency,
    }),
    dispatch => bindActionCreators({ addBookingState }, dispatch)
)(TripDetailsContainer);
