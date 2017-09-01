import React from 'react';
import { localize } from 'react-localize-redux';
import _ from 'lodash';

import BookingModal from '../Modals/BookingModal';
import BookingStatusModal from '../Modals/BookingStatusModal';
import DateTimeHelper from 'app/helpers/DateTimeHelper';

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

import 'features/trip/styles/trip_details.scss';

import { Modal } from 'reactstrap';

class TripDetailsContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpenBookingModal: false,
            isOpenBookingStatusModal: false,
            disableBookingBtn: false,
        };

        this.onBookingBtnClick = this.onBookingBtnClick.bind(this);
        this.onBookingSuccess = this.onBookingSuccess.bind(this);
        this.onBookingClosed = this.onBookingClosed.bind(this);
        this.onBookingStatusClosed = this.onBookingStatusClosed.bind(this);
    }

    formatStartAt() {
        const translate = this.props.translate,
            trip = this.props.details.trip;

        let startAt = DateTimeHelper.dateFormat(trip.start_at_x);

        trip.start_at_format = startAt.date === 'today'
            ? translate('today', {time: startAt.time})
            : startAt.date === 'tomorrow'
                ? translate('tomorrow', {time: startAt.time})
                : `${startAt.date} - ${startAt.time}`;
    }

    onBookingBtnClick() {
        if (!this.state.disableBookingBtn) {
            this.setState({ isOpenBookingModal: true });
        }
    }

    onBookingSuccess() {
        console.log('close');
        this.setState({
            disableBookingBtn: true,
            isOpenBookingStatusModal: true
        });
    }

    onBookingClosed() {
        this.setState({ isOpenBookingModal: false });
    }

    onBookingStatusClosed() {
        this.setState({ isOpenBookingStatusModal: false });
    }

    render() {
        const { trip, routes, driver, vehicle } = this.props.details,
            translate = this.props.translate,
            { isOpenBookingModal, isOpenBookingStatusModal, disableBookingBtn } = this.state;

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

                        <div className="trip-booking-button p-3">
                            <button
                                role="button"
                                className={"btn trip-booking-button__btn py-3" +
                                    (disableBookingBtn ? " disabled" : "")}
                                onClick={ this.onBookingBtnClick }
                            >
                                { translate('trip_details.booking_btn') }
                            </button>
                        </div>
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

                <BookingStatusModal
                    isOpen={ isOpenBookingStatusModal }
                    onClosed={ this.onBookingStatusClosed }
                />
            </div>
        );
    }
}

export default localize(TripDetailsContainer, 'locale');
