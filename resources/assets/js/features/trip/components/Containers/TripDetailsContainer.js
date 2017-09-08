import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTranslate } from 'react-localize-redux';
import _ from 'lodash';

import BookingModal from '../Modals/BookingModal';
import DateTimeHelper from 'app/helpers/DateTimeHelper';

import AuthService from 'app/services/AuthService';
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
        };

        this.onBookingBtnClick = this.onBookingBtnClick.bind(this);
        this.onBookingSuccess = this.onBookingSuccess.bind(this);
        this.onBookingClosed = this.onBookingClosed.bind(this);
    }

    componentWillMount() {
        this.toggleBookingBtn(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.toggleBookingBtn(nextProps);
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
        const { translate, details: {trip, routes, driver, vehicle} } = this.props,
            { isOpenBookingModal, isOpenBookingStatusModal } = this.state;

        const startPoint = routes[0].from,
            endPoint = _.last(routes).to,
            currentBookings = routes[0].bookings.data,
            currentFreeSeats = routes[0].free_seats;
        // TODO :: currentBookings and currentFreeSeats can be not only the first route

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
                <div className="col-md-8">
                    <div className="block-border p-3">
                        <TripMainInfo
                            startPoint={ startPoint.address }
                            endPoint={ endPoint.address }
                            startAt={ trip.start_at_format }
                        />

                        <div className="row mt-4">
                            <div className="col-md-6">
                                <TripDriver driver={ driver } />
                            </div>
                            <div className="col-md-6">
                                <TripVehicle vehicle={ vehicle } />
                            </div>
                        </div>
                    </div>

                    <TripRoutesPassengers
                        maxSeats={ trip.seats }
                        driver={ driver }
                        routes={ routes }
                    />
                </div>

                <div className="col-md-4">
                    <div className="block-border text-center">

                        <TripBookingMainInfo
                            price={ trip.price }
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
                    price={ trip.price }
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
    }),
    dispatch => bindActionCreators({ addBookingState }, dispatch)
)(TripDetailsContainer);
