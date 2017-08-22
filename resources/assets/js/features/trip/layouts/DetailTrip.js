import React from 'react';
import {localize} from 'react-localize-redux';
import LangService from 'app/services/LangService';
import * as lang from '../lang/DetailTrip.locale.json';
import BookingModal from '../components/Modals/BookingModal';

class DetailTrip extends React.Component {

    constructor() {
        super();
        this.state = {
            isOpenBookingModal: false,
            disableBookingBtn: false
        };
        this.onBookingSuccess = this.onBookingSuccess.bind(this);
    }

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    onBookingSuccess() {
        this.setState({disableBookingBtn: true});
    }

    render() {
        const {isOpenBookingModal, disableBookingBtn} = this.state,
            {translate, id} = this.props;

        return (
            <div>
                <BookingModal
                    tripId={id}
                    waypoints={[
                        {
                            "id": 9,
                            "from": {
                                "lng": 30.52340000000004,
                                "lat": 50.4501,
                                "short_address": "Киев",
                                "address": "Киев, Украина, 02000"
                            },
                            "to": {
                                "lng": 28.65866690000007,
                                "lat": 50.25465,
                                "short_address": "Житомир",
                                "address": "Житомир, Житомирская область, Украина, 10001"
                            },
                            "busy_seats": 0
                        },
                        {
                            "id": 10,
                            "from": {
                                "lng": 28.65866690000007,
                                "lat": 50.25465,
                                "short_address": "Житомир",
                                "address": "Житомир, Житомирская область, Украина, 10001"
                            },
                            "to": {
                                "lng": 26.25161700000001,
                                "lat": 50.6199,
                                "short_address": "Ровно",
                                "address": "Ровно, Ровенская область, Украина, 33017"
                            },
                            "busy_seats": 2
                        },
                        {
                            "id": 11,
                            "from": {
                                "lng": 26.25161700000001,
                                "lat": 50.6199,
                                "short_address": "Ровно",
                                "address": "Ровно, Ровенская область, Украина, 33017"
                            },
                            "to": {
                                "lng": 25.594767000000047,
                                "lat": 49.553517,
                                "short_address": "Тернополь",
                                "address": "Тернополь, Тернопольская область, Украина, 46003"
                            },
                            "busy_seats": 2
                        },
                        {
                            "id": 12,
                            "from": {
                                "lng": 25.594767000000047,
                                "lat": 49.553517,
                                "short_address": "Тернополь",
                                "address": "Тернополь, Тернопольская область, Украина, 46003"
                            },
                            "to": {
                                "lng": 26.987133099999937,
                                "lat": 49.422983,
                                "short_address": "Хмельницкий",
                                "address": "Хмельницкий, Хмельницкая область, Украина, 29000"
                            },
                            "busy_seats": 2
                        },
                        {
                            "id": 13,
                            "from": {
                                "lng": 26.987133099999937,
                                "lat": 49.422983,
                                "short_address": "Хмельницкий",
                                "address": "Хмельницкий, Хмельницкая область, Украина, 29000"
                            },
                            "to": {
                                "lng": 24.029717000000005,
                                "lat": 49.839683,
                                "short_address": "Львов",
                                "address": "Львов, Львовская область, Украина, 79000"
                            },
                            "busy_seats": 0
                        }
                    ]}
                    price={12.00}
                    start_at={1503774120}
                    isOpen={isOpenBookingModal}
                    onClosed={this.state.isOpenBookingModal = false}
                    onSuccess={this.onBookingSuccess}
                />
                <button role="button"
                        className={"btn btn-primary" + (disableBookingBtn ? " disabled" : "")}
                        onClick={() => !disableBookingBtn && this.setState({isOpenBookingModal: true})}>
                    {translate('detail_trip.booking_btn')}
                </button>
            </div>
        );
    }
}

export default localize(DetailTrip, 'locale');
