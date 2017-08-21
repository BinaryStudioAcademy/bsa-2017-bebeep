import React from 'react';
import BookingInfo from '../BookingInfo';
import Modal from 'app/components/Modal';

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

    onApproveClick(tripId, bookingId) {
        const status = 'approved';
        console.log('Trip id:', tripId);
        console.log('Booking id:', bookingId);
        console.log('Status:', status);
    }

    onDeclineClick(tripId, bookingId) {
        const status = 'declined';
        console.log('Trip id:', tripId);
        console.log('Booking id:', bookingId);
        console.log('Status:', status);
    }

    render() {
        const { modalIsOpen } = this.state;
        const { bookings, tripId, count } = this.props;
        const onClosed = this.props.onClosed || (() => {});

        return (
            <div>
                <Modal isOpen={ modalIsOpen } onClosed={() => { this.state.modalIsOpen = false; onClosed(); }}>
                    <div className={ "modal-header alert-warning" }>{count} bookings in pending</div>
                    <div className="modal-body">
                        {bookings.map(booking =>
                            <BookingInfo
                                keys={ booking.booking_id }
                                booking={ booking }
                                onApprove={() => this.onApproveClick(tripId, booking.booking_id)}
                                onDecline={() => this.onDeclineClick(tripId, booking.booking_id)}
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