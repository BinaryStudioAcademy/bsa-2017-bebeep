import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { localize } from 'react-localize-redux';
import _ from 'lodash';

import { tripDetailsLoadSuccess } from 'features/trip/actions';

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
                this.props.tripDetailsLoadSuccess(response);
                this.formatStartAt();
                this.setState({
                    preloader: false,
                });
            })
            .catch(error => {});
    }

    formatStartAt() {
        const { trip, translate } = this.props;

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
        this.setState({ disableBookingBtn: true });
    }

    onBookingClosed() {
        this.setState({ isOpenBookingModal: false });
    }

    render() {
        const { id, translate, trip, routes, driver, vehicle } = this.props,
            { isOpenBookingModal, disableBookingBtn, preloader } = this.state;

        if (preloader) {
            return (<Preloader enable={true} />);
        }

        const startPoint = routes[0].from,
            endPoint = _.last(routes).to,
            currentBookings = routes[0].bookings.data,
            possibleSeats = TripDetailsService.getPossibleSeats(trip.seats, routes);

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
                            bookings={ currentBookings }
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

const TripDetailsContainerConnected = connect(
    state => ({
        trip: state.trip.details.trip,
        routes: state.trip.details.routes,
        driver: state.trip.details.driver,
        vehicle: state.trip.details.vehicle
    }),
    (dispatch) =>
        bindActionCreators({ tripDetailsLoadSuccess }, dispatch)
)(TripDetailsContainer);

export default localize(TripDetailsContainerConnected, 'locale');
