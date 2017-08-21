import React from 'react';
import _ from 'lodash';

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

    getBookings() {
        let bookings = this.props.bookings;

        let booking = _.values(bookings).map((booking, i) => {
            return (
                <li key={ i }>{ booking.first_name } - { booking.last_name }</li>
            );
        });

        return (<ul className="list-unstyled">{ booking }</ul>);
    }


    render() {
        const { modalIsOpen } = this.state;
        const onClosed = this.props.onClosed || (() => {});

        return (
            <div>
                <Modal isOpen={ modalIsOpen } onClosed={() => { this.state.modalIsOpen = false; onClosed(); }}>
                    <div className={ "modal-header" }>{this.props.count} bookings in pending</div>
                    <div className="modal-body">{ this.getBookings() }</div>
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