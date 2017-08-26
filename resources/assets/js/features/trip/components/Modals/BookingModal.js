import React from 'react';
import PropTypes from 'prop-types';
import { localize } from 'react-localize-redux';

import Modal from 'app/components/Modal';
import SelectItem from './SelectItem';

import BookingService from 'app/services/BookingService';
import TripDetailsService from 'features/trip/services/TripDetailsService';

import 'features/trip/styles/booking_modal.scss';


class BookingModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenModal: false,
            start: 0,
            end: 0,
            seats: 1,
            possibleSeats: 1,
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeStartPoint = this.onChangeStartPoint.bind(this);
        this.onChangeEndPoint = this.onChangeEndPoint.bind(this);
        this.onChangeSeats = this.onChangeSeats.bind(this);
    }

    componentWillMount() {
        const { start, end, seats } = this.state;
        this.validate(start, end, seats);
    }

    componentWillReceiveProps(newProps) {
        if (this.state.isOpenModal !== newProps.isOpen) {
            this.setState({isOpenModal: newProps.isOpen});
        }
    }

    closeModal() {
        const onClosed = this.props.onClosed || (() => {});
        this.setState({isOpenModal: false});
        onClosed();
    }

    getRouteById(id) {
        return _.findIndex(this.props.waypoints, {id});
    }

    validate(iStart, iEnd, seats) {
        const { waypoints, maxSeats } = this.props;
        const possibleSeats = TripDetailsService.getPossibleSeats(maxSeats, waypoints);

        const errors = BookingService.validateBooking(
            iStart,
            iEnd,
            seats,
            possibleSeats
        );
        this.setState({possibleSeats});
        this.setState({errors});
    }

    onSubmit(e) {
        e.preventDefault();
        const {onSuccess, waypoints, tripId} = this.props,
            { start, end, seats, errors } = this.state;

        if (_.isEmpty(errors)) {
            BookingService.createBooking(tripId, {
                    routes: [
                        waypoints[start].id,
                        waypoints[end].id
                    ],
                    seats
                }).then((data) => {
                    onSuccess();
                    this.closeModal();
                })
                .catch((error) => this.setState({errors: error.response.data}));
        }
    }

    onChangeStartPoint(e) {
        const start = this.getRouteById(+e.target.value);
        this.validate(start, this.state.end, this.state.seats);
        this.setState({start});
    }

    onChangeEndPoint(e) {
        const end = this.getRouteById(+e.target.value);
        this.validate(this.state.start, end, this.state.seats);
        this.setState({end});
    }

    onChangeSeats(e) {
        const seats = +e.target.value;
        this.validate(this.state.start, this.state.end, seats);
        this.setState({seats});
    }

    render() {
        const {isOpenModal, errors, possibleSeats} = this.state,
            {translate, waypoints, price, startAt, maxSeats} = this.props;

        return (
            <Modal isOpen={isOpenModal} onClosed={() => { this.closeModal() }}>
                <form onSubmit={this.onSubmit} className="booking-modal">
                    <div className="modal-header">{translate('trip_details.booking.header')}</div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-sm-6">
                                <span className="text-muted booking-modal__text mr-2">
                                    {translate('trip_details.booking.start_trip')}:
                                </span>
                                <b>{ startAt }</b>
                            </div>
                            <div className="col-sm-6">
                                <span className="text-muted booking-modal__text mr-2">
                                    {translate('trip_details.booking.price_of_trip')}:
                                </span>
                                <b>$</b> { price }
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-sm-4">
                                <div className={"form-group" + (!!errors.start ? ' has-danger' : '')}>
                                    <label className="form-control-label booking-modal__text">
                                        {translate('trip_details.booking.start_point')}
                                    </label>
                                    <select
                                        name="start_point"
                                        className={"form-control" + (!!errors.start ? ' has-danger' : '')}
                                        onChange={this.onChangeStartPoint}
                                    >
                                        {waypoints.map(p => (
                                            <SelectItem
                                                key={'from_' + p.id}
                                                value={p.id}
                                                disabled={p.busy_seats >= maxSeats}
                                            >{p.from.short_address}</SelectItem>
                                        ))}
                                    </select>
                                    <small className="form-control-feedback">{errors.start}</small>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className={"form-group" + (!!errors.end ? ' has-danger' : '')}>
                                    <label className="form-control-label booking-modal__text">
                                        {translate('trip_details.booking.end_point')}
                                    </label>
                                    <select
                                        name="end_point"
                                        className={"form-control" + (!!errors.end ? ' has-danger' : '')}
                                        onChange={this.onChangeEndPoint}
                                    >
                                        {waypoints.map(((p) => (
                                            <SelectItem
                                                key={'to_' + p.id}
                                                value={p.id}
                                                disabled={p.busy_seats >= maxSeats}
                                            >{p.to.short_address}</SelectItem>
                                        )))}
                                    </select>
                                    <small className="form-control-feedback">{errors.end}</small>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className={"form-group" + (!!errors.seats ? ' has-danger' : '')}>
                                    <label className="form-control-label booking-modal__text">
                                        {translate('trip_details.booking.seats')}
                                    </label>
                                    <input
                                        type="number"
                                        className={"form-control" + (!!errors.seats ? ' has-danger' : '')}
                                        name="seats"
                                        defaultValue="1"
                                        min="1"
                                        max={maxSeats}
                                        onChange={this.onChangeSeats}
                                    />
                                    <small className="form-text text-muted">{translate('trip_details.booking.free_seats', {seats: possibleSeats})}</small>
                                    <small className="form-control-feedback">{errors.seats}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer text-right">
                        <div className="btn btn-danger" role="button" onClick={() => this.closeModal()}>
                            {translate('trip_details.booking.cancel')}
                        </div>
                        <button role="button" className="btn btn-success">{translate('trip_details.booking.apply')}</button>
                    </div>
                </form>
            </Modal>
        );
    }
}

BookingModal.PropTypes = {
    waypoints: PropTypes.array.required,
    price: PropTypes.number.required,
    startAt: PropTypes.string.required,
    maxSeats: PropTypes.number.required,
    tripId: PropTypes.number.required,
    isOpen: PropTypes.bool.required,
    onClosed: PropTypes.func,
    onSuccess: PropTypes.func.required
};

export default localize(BookingModal, 'locale');
