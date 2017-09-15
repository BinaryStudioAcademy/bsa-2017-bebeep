import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTranslate } from 'react-localize-redux';

import BookingInfo from '../BookingInfo';
/*import Modal from 'app/components/Modal';*/
import {Modal} from 'reactstrap';

import { changeBookingStatus } from 'features/trip-list/actions';
import BookingService, {
    BOOKING_STATUS_DECLINED,
    BOOKING_STATUS_APPROVED
} from 'app/services/BookingService';

import 'features/trip-list/styles/booking-info.scss';


class BookingModal extends React.Component {

    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    componentWillMount() {
        if (this.props.isOpen) {
            this.toggleModal();
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.state.modalIsOpen !== newProps.isOpen) {
            this.toggleModal();
        }
    }

    onActionClick(tripId, bookingId, status) {
        const { changeBookingStatus } = this.props;
        const data = { status };

        BookingService.updateBookingStatus(tripId, bookingId, data)
            .then(() => {
                changeBookingStatus(bookingId, status);
            });

        this.toggleModal();
    }

    toggleModal() {
        const {modalIsOpen} = this.state;
        const onClosed = this.props.onClosed || (() => {});

        this.setState({modalIsOpen: !modalIsOpen});
        if (modalIsOpen) {
            onClosed();
        }
    }

    render() {
        const { modalIsOpen } = this.state;
        const { translate, bookings, tripId, count } = this.props;

        return (
            <div>
                <Modal isOpen={ modalIsOpen }
                    toggle={this.toggleModal}
                >
                    <div className={ "modal-header booking-back" }>
                        <span>
                            <strong>{count}</strong> { translate('booking.bookings_in_pending') }
                        </span>
                        <button className="btn btn-sm btn-booking"
                            role="button"
                            onClick={this.toggleModal}
                        >
                            <i className="fa fa-times" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="modal-body trip-bookings-modal">
                        <ul className="list-unstyled">
                            {bookings.map((booking, i) =>
                                <BookingInfo
                                    key={ i }
                                    booking={ booking }
                                    onApprove={() => this.onActionClick(tripId, booking.id, BOOKING_STATUS_APPROVED)}
                                    onDecline={() => this.onActionClick(tripId, booking.id, BOOKING_STATUS_DECLINED)}
                                />
                            )}
                        </ul>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default connect(
    state => ({
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({changeBookingStatus}, dispatch)
)(BookingModal);
