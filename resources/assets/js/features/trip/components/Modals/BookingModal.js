import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { localize } from 'react-localize-redux';

import Modal from 'app/components/Modal';
import SelectItem from './SelectItem';

import BookingService from 'app/services/BookingService';
import {USER_ROLE_PASSENGER} from 'app/services/UserService';
import { userBookingSetState, userFormRoleSetState, userHaveBookingSetState } from 'features/user/actions';

import 'features/trip/styles/booking_modal.scss';


class BookingModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpenModal: false,
            start: 0,
            end: 0,
            seats: 1,
            freeSeats: 1,
            price: 0.0,
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeStartPoint = this.onChangeStartPoint.bind(this);
        this.onChangeEndPoint = this.onChangeEndPoint.bind(this);
        this.onChangeSeats = this.onChangeSeats.bind(this);
    }

    componentWillMount() {
        const { start, end, seats } = this.state,
            price = this.getPrice(start, end, seats);

        this.setFreeSeats();
        this.validate(start, end, seats);
        this.setState({price});
    }

    componentWillReceiveProps(newProps) {
        if (this.state.isOpenModal !== newProps.isOpen) {
            this.setState({ isOpenModal: newProps.isOpen });
        }
    }

    closeModal() {
        const onClosed = this.props.onClosed;

        this.setState({ isOpenModal: false });
        onClosed();
    }

    getRouteById(id) {
        return _.findIndex(this.props.waypoints, {id});
    }

    getFreeSeats(num) {
        num = num || 0;
        return this.props.waypoints[num].free_seats;
    }

    setFreeSeats(param, isFreeSeats) {
        const freeSeats = isFreeSeats ? param : this.getFreeSeats(param);

        this.setState({ freeSeats: freeSeats });
    }

    getPrice(iStart, iEnd, iSeats) {
        const {waypoints} = this.props;

        return iSeats * _.reduce(
                _.slice(
                    _.map(waypoints, 'price'),
                    iStart,
                    iEnd + 1
                ),
                (result, price) => {
                    return result + price;
                },
                0.0
            );
    }

    validate(iStart, iEnd, seats) {
        const { waypoints } = this.props,
            freeSeats = this.getFreeSeats(iStart);

        const errors = BookingService.validateBooking(
            iStart,
            iEnd,
            seats,
            freeSeats
        );

        this.setFreeSeats(freeSeats, true);
        this.setState({ errors });
    }

    onSubmit(e) {
        e.preventDefault();

        const { onSuccess, waypoints, tripId, userLogin } = this.props,
            { start, end, seats, errors } = this.state;

        if (_.isEmpty(errors)) {
            const routes = _.slice(_.map(waypoints, 'id'), start, end + 1);
            if(userLogin){
                BookingService.createBooking(tripId, {
                    routes,
                    seats
                }).then((data) => {
                    onSuccess();
                    browserHistory.push('/bookings');
                })
                    .catch((error) => this.setState({ errors: error.response.data }));
            } else {
                this.props.userFormRoleSetState(USER_ROLE_PASSENGER);
                this.props.userBookingSetState({tripId, routes, seats});
                this.props.userHaveBookingSetState(true);
                browserHistory.push('/registration');
            }
        }
    }

    onChangeStartPoint(e) {
        const start = this.getRouteById(+e.target.value),
            price = this.getPrice(start, this.state.end, this.state.seats);

        this.validate(start, this.state.end, this.state.seats);
        this.setState({ start, price });
    }

    onChangeEndPoint(e) {
        const end = this.getRouteById(+e.target.value),
            price = this.getPrice(this.state.start, end, this.state.seats);

        this.validate(this.state.start, end, this.state.seats);
        this.setState({ end, price });
    }

    onChangeSeats(e) {
        const seats = +e.target.value,
            price = this.getPrice(this.state.start, this.state.end, seats);

        this.validate(this.state.start, this.state.end, seats);
        this.setState({ seats, price });
    }

    render() {
        const {isOpenModal, freeSeats, errors, start, end} = this.state,
            { translate, waypoints, price, startAt, maxSeats, currencySign } = this.props;

        return (
            <Modal isOpen={isOpenModal} onClosed={() => { this.closeModal() }}>
                <form onSubmit={this.onSubmit} className="booking-modal">
                    <div className="modal-header">
                        { translate('trip_details.booking.header') }
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-sm-6">
                                <span className="text-muted booking-modal__text mr-2">
                                    { translate('trip_details.booking.start_trip') }:
                                </span>
                                <b>{ startAt }</b>
                            </div>
                            <div className="col-sm-6">
                                <span className="text-muted booking-modal__text mr-2">
                                    { translate('trip_details.booking.price_of_trip') }:
                                </span>
                                <b>{ currencySign }</b> { price }
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-sm-4">
                                <div className={"form-group" + (!!errors.start ? ' has-danger' : '')}>
                                    <label className="form-control-label booking-modal__text">
                                        { translate('trip_details.booking.start_point') }
                                    </label>
                                    <select
                                        name="start_point"
                                        className={"form-control" + (!!errors.start ? ' has-danger' : '')}
                                        defaultValue={waypoints[start].id}
                                        onChange={ this.onChangeStartPoint }
                                    >
                                        {waypoints.map(p => (
                                            <SelectItem
                                                key={'from_' + p.id}
                                                value={p.id}
                                                disabled={p.reserved_seats >= maxSeats}
                                            >{p.from.short_address}</SelectItem>
                                        ))}
                                    </select>
                                    <small className="form-control-feedback">
                                        { errors.start }
                                    </small>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className={"form-group" + (!!errors.end ? ' has-danger' : '')}>
                                    <label className="form-control-label booking-modal__text">
                                        { translate('trip_details.booking.end_point') }
                                    </label>
                                    <select
                                        name="end_point"
                                        className={"form-control" + (!!errors.end ? ' has-danger' : '')}
                                        defaultValue={waypoints[end].id}
                                        onChange={this.onChangeEndPoint}
                                    >
                                        {waypoints.map(((p) => (
                                            <SelectItem
                                                key={'to_' + p.id}
                                                value={p.id}
                                                disabled={p.reserved_seats >= maxSeats}
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
                                    <small className="form-text text-muted">{translate('trip_details.booking.free_seats', {seats: freeSeats})}</small>
                                    <small className="form-control-feedback">{errors.seats}</small>
                                </div>
                            </div>
                        </div>
                        <small className="text-danger">{errors.errors || ''}</small>
                    </div>
                    <div className="modal-footer text-right">
                        <div className="btn btn-danger" role="button" onClick={() => this.closeModal()}>
                            {translate('trip_details.booking.cancel')}
                        </div>
                        <button role="button" className="btn btn-success">
                            { translate('trip_details.booking.apply') }</button>
                    </div>
                </form>
            </Modal>
        );
    }
}

BookingModal.defaultProps = {
    isOpen: false,
    onClosed: () => {},
};

BookingModal.PropTypes = {
    waypoints: PropTypes.array.required,
    price: PropTypes.object.required,
    startAt: PropTypes.string.required,
    maxSeats: PropTypes.number.required,
    tripId: PropTypes.number.required,
    isOpen: PropTypes.bool.required,
    onClosed: PropTypes.func,
    onSuccess: PropTypes.func.required
};

const BookingModalConnected = connect(
    state => ({
        userLogin: state.user.login.success
    }),
    (dispatch) =>
        bindActionCreators({userBookingSetState,userFormRoleSetState,userHaveBookingSetState}, dispatch)
)(BookingModal);

export default localize(BookingModalConnected, 'locale');
