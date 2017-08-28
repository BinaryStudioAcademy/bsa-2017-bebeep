import React from 'react';
import { browserHistory } from 'react-router';
import { localize } from 'react-localize-redux';
import _ from 'lodash';

import TripDetailsService from 'features/trip/services/TripDetailsService';
import DateTimeHelper from 'app/helpers/DateTimeHelper';

import Preloader from 'app/components/Preloader';
import BookingModal from '../Modals/BookingModal';
import {
    TripMainPoints,
    TripMainInfo,
    TripDriver,
    TripVehicle,
    TripRoutesPassengers,
    TripBookingMainInfo,
    TripPassengersCurrent
} from '../Details';

import 'features/trip/styles/trip_details.scss';


class TripDetailsContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            trip: null,
            routes: null,
            driver: null,
            vehicle: null,
            isOpenBookingModal: false,
            disableBookingBtn: false,
            preloader: true,
        };

        this.onBookingBtnClick = this.onBookingBtnClick.bind(this);
        this.onBookingSuccess = this.onBookingSuccess.bind(this);
        this.onBookingClosed = this.onBookingClosed.bind(this);
    }

    componentDidMount() {
        TripDetailsService.getDetails(this.props.id)
            .then(response => {
                this.setState({
                    trip: response.trip,
                    routes: response.routes.data,
                    driver: response.driver.data,
                    vehicle: response.vehicle.data,
                    preloader: false,
                });
                this.formatStartAt();
            })
            .catch(error => {});
    }

    formatStartAt() {
        const trip = this.state.trip;
        const translate = this.props.translate;

        let startAt = DateTimeHelper.dateFormat(trip.start_at_x);

        startAt = startAt.date === 'today'
            ? translate('today', {time: startAt.time})
            : startAt.date === 'tomorrow'
                ? translate('tomorrow', {time: startAt.time})
                : `${startAt.date} - ${startAt.time}`;

        this.setState({
            trip: {
                ...trip,
                start_at_format: startAt,
            },
        });
    }

    onBookingBtnClick() {
        if (!this.state.disableBookingBtn) {
            this.setState({ isOpenBookingModal: true });
        }
    }

    onBookingSuccess() {
        this.setState({ disableBookingBtn: true });
    }

    onBookingClosed() {
        this.setState({ isOpenBookingModal: false });
    }

    render() {
        const {
                trip,
                routes,
                driver,
                vehicle,
                isOpenBookingModal,
                disableBookingBtn,
                preloader
            } = this.state,
            { translate, id } = this.props;

        if (preloader) {
            return (
                <Preloader enable={true} />
            );
        }

        const startPoint = routes[0].from;
        const endPoint = _.last(routes).to;
        const possibleSeats = TripDetailsService.getPossibleSeats(trip.seats, routes);

        return (
            <div className="row">
                <div className="col-12">
                    <TripMainPoints
                        startPoint={ startPoint.short_address }
                        endPoint={ endPoint.short_address }
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
                            possibleSeats={ possibleSeats }
                        />
                        <TripPassengersCurrent
                            maxSeats={ trip.seats }
                            bookings={ routes[0].bookings.data }
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
                    tripId={ id }
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

export default localize(TripDetailsContainer, 'locale');
