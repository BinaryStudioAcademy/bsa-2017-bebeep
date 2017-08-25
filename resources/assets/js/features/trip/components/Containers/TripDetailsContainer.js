import React from 'react';
import { browserHistory } from 'react-router';
import { localize } from 'react-localize-redux';
import _ from 'lodash';

import TripDetailsService from 'features/trip/services/TripDetailsService';

import BookingModal from '../Modals/BookingModal';
import {
    TripMainPoints,
    TripMainInfo,
    TripDriver,
    TripVehicle,
    TripRoutesPassengers,
    TripBookingMainInfo,
    TripPassengersList
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
            disableBookingBtn: false
        };

        this.onBookingBtnClick = this.onBookingBtnClick.bind(this);
        this.onBookingSuccess = this.onBookingSuccess.bind(this);
        this.onBookingClosed = this.onBookingClosed.bind(this);
    }

    componentDidMount() {
        TripDetailsService.getDetails(this.props.id)
            .then(response => {
                response = TripDetailsService.transformData(response.data);

                this.setState({
                    trip: response.trip,
                    routes: response.routes.data,
                    driver: response.driver.data,
                    vehicle: response.vehicle.data,
                });
            })
            .catch(error => {
                this.setState({
                    trip: null,
                    routes: null,
                    driver: null,
                    vehicle: null,
                });
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
                disableBookingBtn
            } = this.state,
            { translate, id } = this.props;

        if (!trip) {
            return (<div />);
        }

        const startPoint = routes[0].from;
        const endPoint = _.last(routes).to;
        const possibleSeats = TripDetailsService.getPossibleSeats(trip.seats, routes);

        return (
            <div className="row">
                <div className="col-md-8">
                    <div className="block-border p-3">
                        <TripMainPoints
                            startPoint={ startPoint.short_address }
                            endPoint={ endPoint.short_address }
                        />

                        <TripMainInfo
                            startPoint={ startPoint.address }
                            endPoint={ endPoint.address }
                            startAt={ trip.start_at }
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

                    <TripRoutesPassengers maxSeats={ trip.seats } routes={ routes } />
                </div>

                <div className="col-md-4">
                    <div className="block-border text-center">

                        <TripBookingMainInfo
                            price={ trip.price }
                            possibleSeats={ possibleSeats }
                        />
                        <TripPassengersList />

                        <div className="trip-booking-button-area p-3">
                            <button
                                role="button"
                                className={"btn trip-booking-button py-3" +
                                    (disableBookingBtn ? " disabled" : "")}
                                onClick={ this.onBookingBtnClick }
                            >
                                { translate('trip_details.booking_btn') }
                            </button>

                            <BookingModal
                                tripId={ id }
                                maxSeats={ trip.seats }
                                waypoints={ routes }
                                price={ trip.price }
                                start_at={ trip.start_at_x }
                                isOpen={ isOpenBookingModal }
                                onClosed={ this.onBookingClosed }
                                onSuccess={ this.onBookingSuccess }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default localize(TripDetailsContainer, 'locale');
