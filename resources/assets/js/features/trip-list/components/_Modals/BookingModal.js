import React from 'react';
import BookingInfo from '../BookingInfo';
import Modal from 'app/components/Modal';
import BookingService from 'app/services/BookingService';

class BookingModal extends React.Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
        };
    }

    componentWillReceiveProps(newProps) {
        if (this.state.modalIsOpen !== newProps.isOpen) {
            this.setState({
                modalIsOpen: newProps.isOpen
            });
        }
    }

    onActionClick(tripId, bookingId, status) {
        const data = {
            status
        };

        BookingService.updateBookingStatus(tripId, bookingId, data);
        this.setState({
            modalIsOpen: false
        });
    }


    render() {
        const { modalIsOpen } = this.state;
        const { bookings, tripId, count } = this.props;
        const onClosed = this.props.onClosed || (() => {});
        const approved = 'approved';
        const declined = 'declined';

        return (
            <div>
                <Modal isOpen={ modalIsOpen } onClosed={() => { this.state.modalIsOpen = false; onClosed(); }}>
                    <div className={ "modal-header alert-warning" }><span><strong>{count}</strong> bookings in pending</span></div>
                    <div className="modal-body">
                        {bookings.map((booking, i) =>
                            <BookingInfo
                                key={ i }
                                booking={ booking }
                                onApprove={() => this.onActionClick(tripId, booking.booking_id, approved)}
                                onDecline={() => this.onActionClick(tripId, booking.booking_id, declined)}
                            />
                        )}
                        </div>
                    <div className="modal-footer text-right">
                        <button className={ "btn btn-default" } role="button" onClick={(e) => {
                            this.setState({ modalIsOpen: false });
                        }}>Close</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default BookingModal;