import React from 'react';
import PropTypes from 'prop-types';
import BookingService from 'app/services/BookingService';
import Preloader from 'app/components/Preloader';
import {Pagination} from 'app/components/Pagination';
import BookingItem from './BookingItem';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {bookingsGetSuccess} from '../actions'
import '../styles/bookings-container.scss';
import CancelBookingModal from "./_Modals/CancelBookingModal";
import ReviewBookingModal from "./_Modals/ReviewBookingModal";

class BookingsContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            limit: 10,
            errors: {},
            preloader: false,
            canceledBooking: null,
            reviewBookingModal: null
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

    showReviewBookingModal(booking) {
        this.setState({
            reviewBookingModal: booking
        });
    }

    hideReviewBookingModal() {
        this.setState({
            reviewBookingModal: null
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
        const { filter, bookingsGetSuccess } = props,
            {page, limit} = state;

        this.setState({preloader: true});

        BookingService.getBookingsList(filter, page, limit)
            .then(data => {
                this.setState({preloader: false});
                bookingsGetSuccess(data);
            })
            .catch(error => this.setState({errors: error, preloader: false}));
    }

    onChangePage(page) {
        this.setState({page});
        this.getData(this.props, Object.assign(this.state, {page}));
    }

    render() {
        const {page, limit, preloader} = this.state,
            {data, meta, filter} = this.props;

        return (
            <div className="bookings-container">
                <div className="bookings-container__items">
                    <Preloader enable={preloader} />
                    {data.map(booking => (
                        <BookingItem key={booking.id}
                                     booking={booking}
                                     filter={filter}
                                     showCancelBookingModal={this.showCancelBookingModal.bind(this)}
                                     showReviewBookingModal={this.showReviewBookingModal.bind(this)}
                        />
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
                <ReviewBookingModal isOpen={this.state.reviewBookingModal} onClose={this.hideReviewBookingModal.bind(this)} />
            </div>
        );
    }
}

BookingsContainer.PropTypes = {
    filter: PropTypes.string
};

export default connect(
    state => ({
        data: state.bookings.data,
        meta: state.bookings.meta
    }),
    dispatch => bindActionCreators({bookingsGetSuccess}, dispatch)
)(BookingsContainer);
