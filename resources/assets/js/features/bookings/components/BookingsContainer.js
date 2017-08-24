import React from 'react';
import PropTypes from 'prop-types';
import BookingService from 'app/services/BookingService';
import Preloader from 'app/components/Preloader';
import {Pagination} from 'app/components/Pagination';
import BookingItem from './BookingItem';
import '../styles/bookings-container.scss';
import CancelBookingModal from "./_Modals/CancelBookingModal";

class BookingsContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            limit: 10,
            data: [],
            meta: {},
            errors: {},
            preloader: false,
            canceledBooking: null
        };

        this.onChangePage = this.onChangePage.bind(this);
    }

    componentWillMount() {
        this.getData(this.props, this.state);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.filter !== this.props.filter) {
            this.setState({page: 1});
            this.getData(nextProps, Object.assign(this.state, {page: 1}));
        } else {
            this.getData(nextProps, this.state);
        }
    }

    showCancelBookingModal(booking) {
        this.setState({
            canceledBooking: booking
        });
    }

    hideCancelBookingModal() {
        this.setState({
            canceledBooking: null
        });
    }

    cancelBooking() {
        BookingService.cancelBooking(this.state.canceledBooking.id).then(() => {
            this.setState({
                canceledBooking: null
            });

            this.getData(this.props, this.state);
        });
    }

    getData(props, state) {
        const { filter } = props,
            {page, limit} = state;

        this.setState({preloader: true});

        BookingService.getBookingsList(filter, page, limit)
            .then(data => this.setState({
                data: data.data,
                meta: data.meta,
                preloader: false
            }))
            .catch(error => this.setState({errors: error, preloader: false}));
    }

    onChangePage(page) {
        this.setState({page});
        this.getData(this.props, Object.assign(this.state, {page}));
    }

    render() {
        const {data, meta, page, limit, preloader} = this.state;

        return (
            <div className="bookings-container">
                <div className="bookings-container__items">
                    <Preloader enable={preloader} />
                    {data.map(booking => (
                        <BookingItem key={booking.id} booking={booking} showCancelBookingModal={this.showCancelBookingModal.bind(this)} />
                    ))}
                </div>
                <Pagination
                    isDisabled={preloader}
                    size={+meta.total}
                    page={+page}
                    limit={limit}
                    onChangePage={this.onChangePage}
                />

                <CancelBookingModal isOpen={this.state.canceledBooking} onSubmit={this.cancelBooking.bind(this)} onClose={this.hideCancelBookingModal.bind(this)} />
            </div>
        );
    }
}

BookingsContainer.PropTypes = {
    filter: PropTypes.string
};

export default BookingsContainer;
