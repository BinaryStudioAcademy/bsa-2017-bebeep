import React from 'react';
import { localize } from 'react-localize-redux';
import PropTypes from 'prop-types';
import Modal from 'app/components/Modal';

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

    render() {
        const {isOpenModal} = this.state,
            {translate, waypoints, price, start_at} = this.props;

        return (
            <Modal isOpen={isOpenModal} onClosed={() => { this.closeModal() }}>
                <form onSubmit={this.onSubmit}>
                    <div className="modal-header">{translate('detail_trip.booking.header')}</div>
                    <div className="modal-body">

                    </div>
                    <div className="modal-footer text-right">
                        <div className="btn btn-danger" role="button" onClick={() => this.closeModal()}>{translate('detail_trip.booking.cancel')}</div>
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
    isOpen: PropTypes.bool.required,
    onClosed: PropTypes.func,
    onSuccess: PropTypes.func.required
};

export default localize(BookingModal, 'locale');
