import React from 'react';
import { localize } from 'react-localize-redux';
import PropTypes from 'prop-types';
import Modal from 'app/components/Modal';
import SelectItem from './SelectItem';
import moment from 'moment';

class BookingModal extends React.Component {

    constructor() {
        super();
        this.state = {
            isOpenModal: false
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const {onSuccess} = this.props;

        onSuccess();
        this.closeModal();
    }

    closeModal() {
        const onClosed = this.props.onClosed || (() => {});
        this.setState({isOpenModal: false});
        onClosed();
    }

    componentWillReceiveProps(newProps) {
        if (this.state.isOpenModal !== newProps.isOpen) {
            this.setState({isOpenModal: newProps.isOpen});
        }
    }

    dateFormat(timestamp) {
        const {translate} = this.props,
            date = moment(timestamp * 1000),
            locale = moment().locale(),
            localeData = moment().locale(locale).localeData(),
            day = _.padStart(date.date(), 2, '0'),
            weekday = _.capitalize(localeData.weekdaysShort(date)),
            month = _.capitalize(localeData.monthsShort(date)),
            minute = _.padStart(date.minute(), 2, '0'),
            hour = _.padStart(date.hour(), 2, '0'),
            now = moment(),
            time = `- ${hour}:${minute}`;
        if (now.isSame(date, 'day')) {
            return `${translate('search_result.today')} ${time}`
        } else if (now.isSame(date.subtract(1, 'day'), 'day')) {
            return `${translate('search_result.tomorrow')} ${time}`
        }
        return `${weekday}. ${day} ${month} ${time}`;
    }

    render() {
        const {isOpenModal} = this.state,
            {translate, waypoints, price, start_at, seats} = this.props;

        return (
            <Modal isOpen={isOpenModal} onClosed={() => { this.closeModal() }}>
                <form onSubmit={this.onSubmit}>
                    <div className="modal-header">{translate('detail_trip.booking.header')}</div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="text-muted" style={{fontSize: '.8rem'}}>
                                    {translate('detail_trip.booking.start_trip')}
                                </div>
                                <b>{this.dateFormat(start_at)}</b>
                            </div>
                            <div className="col-sm-6">
                                <div className="text-muted" style={{fontSize: '.8rem'}}>
                                    {translate('detail_trip.booking.price_of_trip')}
                                </div>
                                <b>$</b>{price}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="text-muted" style={{fontSize: '.8rem'}}>
                                    {translate('detail_trip.booking.start_point')}
                                </div>
                                <select name="start_point" className="form-control"
                                        ref={input => this.startPoint = input}
                                >
                                    {waypoints.map((p => (
                                        <SelectItem
                                            key={'from_' + p.id}
                                            value={p.id}
                                            disabled={p.busy_seats >= seats}
                                        >{p.from.short_address}</SelectItem>
                                    )))}
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <div className="text-muted" style={{fontSize: '.8rem'}}>
                                    {translate('detail_trip.booking.end_point')}
                                </div>
                                <select name="end_point" className="form-control"
                                        ref={input => this.endPoint = input}
                                >
                                    {waypoints.map((p => (
                                        <SelectItem
                                            key={'to_' + p.id}
                                            value={p.id}
                                            disabled={p.busy_seats >= seats}
                                        >{p.to.short_address}</SelectItem>
                                    )))}
                                </select>
                            </div>
                            <div className="col-sm-4">
                                <div className="text-muted" style={{fontSize: '.8rem'}}>
                                    {translate('detail_trip.booking.seats')}
                                </div>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="seats"
                                    defaultValue="1"
                                    min="1"
                                    max={seats}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer text-right">
                        <div className="btn btn-danger" role="button" onClick={() => this.closeModal()}>
                            {translate('detail_trip.booking.cancel')}
                        </div>
                        <button role="button" className="btn btn-success">{translate('detail_trip.booking.apply')}</button>
                    </div>
                </form>
            </Modal>
        );
    }
}

BookingModal.PropTypes = {
    waypoints: PropTypes.array.required,
    price: PropTypes.number.required,
    start_at: PropTypes.number.required,
    seats: PropTypes.number.required,
    tripId: PropTypes.number.required,
    isOpen: PropTypes.bool.required,
    onClosed: PropTypes.func,
    onSuccess: PropTypes.func.required
};

export default localize(BookingModal, 'locale');
