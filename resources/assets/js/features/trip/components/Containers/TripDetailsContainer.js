import React from 'react';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import { localize } from 'react-localize-redux';

import LangService from 'app/services/LangService';
import * as lang from 'features/trip/lang/details/TripBooking.locale.json';

import TripDetailsService from 'features/trip/services/TripDetailsService';

import TripDriver from '../Details/TripDriver';
import TripVehicle from '../Details/TripVehicle';
import BookingModal from '../Modals/BookingModal';

import 'features/trip/styles/trip_details.scss';

class TripDetailsContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            trip: null,
            routes: null,
            driver: null,
            vehicle: null,
            isOpenBookingModal: false,
            disableBookingBtn: false
        };

        this.onBookingBtnClick = this.onBookingBtnClick.bind(this);
        this.onBookingSuccess = this.onBookingSuccess.bind(this);
        this.onBookingClosed = this.onBookingClosed.bind(this);
    }

    componentDidMount() {
        TripDetailsService.getDetails(this.props.id)
            .then(response => {
                response = TripDetailsService.transformData(response.data);

                response.vehicle.data.photo = null;

                response.routes.data[0].busy_seats = 2;
                response.routes.data[1].busy_seats = 1;

                console.log(response);

                this.setState({
                    trip: response.trip,
                    routes: response.routes.data,
                    driver: response.driver.data,
                    vehicle: response.vehicle.data,
                });
            })
            .catch(error => {
                this.setState({
                    trip: null,
                    routes: null,
                    driver: null,
                    vehicle: null,
                });
            });
    }

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    onBookingBtnClick() {
        if (!this.state.disableBookingBtn) {
            this.setState({ isOpenBookingModal: true });
        }
    }

    onBookingSuccess() {
        this.setState({ disableBookingBtn: true });
    }

    onBookingClosed() {
        this.setState({ isOpenBookingModal: false });
    }

    render() {
        const {
                trip,
                routes,
                driver,
                vehicle,
                isOpenBookingModal,
                disableBookingBtn
            } = this.state,
            { translate, id } = this.props;

        if (!trip) {
            return (
                <div />
            );
        }

        console.log( _.sumBy(routes, 'busy_seats') );

        const startPoint = routes[0].from;
        const endPoint = _.last(routes).to;

        return (
            <div className="row">
                <div className="col-md-8">
                    <div className="block-border p-3">
                        <div className="trip-main-points">
                            <span className="trip-start-point">
                                { startPoint.short_address }
                            </span>
                            <i className="fa fa-long-arrow-right mx-2" aria-hidden="true" />
                            <span className="trip-end-point">
                                { endPoint.short_address }
                            </span>
                        </div>

                        <dl className="row trip-main-info mt-4">
                            <dt className="col-sm-3">Місце посадки</dt>
                            <dd className="col-sm-9">
                                <span className="trip-start-point-address">
                                    { startPoint.address }
                                </span>
                            </dd>

                            <dt className="col-sm-3">Місце прибуття</dt>
                            <dd className="col-sm-9">
                                <span className="trip-end-point-address">
                                    { endPoint.address }
                                </span>
                            </dd>

                            <dt className="col-sm-3">Дата</dt>
                            <dd className="col-sm-9">
                                <p className="trip-date-start-at">{ trip.start_at }</p>
                            </dd>
                        </dl>

                        <div className="row">
                            <div className="col-md-6">
                                <TripDriver driver={ driver } />
                            </div>
                            <div className="col-md-6">
                                <TripVehicle vehicle={ vehicle } />
                            </div>
                        </div>
                    </div>

                    <section className="block-border p-3 mt-4">
                        <header>
                            <h3 className="h5">Маршрут і попутники</h3>
                        </header>

                        <table className="table table-responsive">
                            <thead>
                              <tr>
                                <th></th>
                                <th>Driver</th>
                                <th>Pass 1</th>
                                <th>Pass 2</th>
                                <th>Pass 3</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">Київ</th>
                                <td>+</td>
                                <td>+</td>
                                <td>+</td>
                                <td>+</td>
                              </tr>
                              <tr>
                                <th scope="row">Рівне</th>
                                <td>+</td>
                                <td>+</td>
                                <td>+</td>
                                <td></td>
                              </tr>
                              <tr>
                                <th scope="row">Львів</th>
                                <td>+</td>
                                <td>+</td>
                                <td></td>
                                <td></td>
                              </tr>
                            </tbody>
                        </table>
                    </section>
                </div>

                <div className="col-md-4">
                    <div className="block-border text-center">
                        <div className="d-flex">
                            <div className="trip-price px-3 py-2">
                                <span className="trip-booking-value d-block">{ trip.price } &#8372;</span>
                                <span className="trip-booking-label">з пасажира</span>
                            </div>
                            <div className="trip-places-free px-3 py-2">
                                <span className="trip-booking-value d-block">2</span>
                                <span className="trip-booking-label">вільні місця</span>
                            </div>
                        </div>

                        <div className="trip-passengers p-3">
                            <span className="trip-booking-label d-block">Пасажири в цій поїздці</span>
                            <ul className="d-flex flex-wrap justify-content-center list-unstyled mt-3">
                                <li className="trip-passenger__item">
                                    <img className="trip-passenger" alt="Юрій К (46 р.)" src="https://d1ovtcjitiy70m.cloudfront.net/vi-1/images/avatar/passenger-male-36.png" />
                                </li>
                                <li className="trip-passenger__item">
                                    <img className="trip-passenger" alt="Юрій К (46 р.)" src="https://d2kwny77wxvuie.cloudfront.net/user/HYg3XtbNS-aOMm3w4AP1cg/thumbnail_36x36.jpeg" />
                                </li>
                                <li className="trip-passenger__item">
                                    <img className="trip-passenger" alt="Юрій К (46 р.)" src="https://d2kwny77wxvuie.cloudfront.net/user/uARSfObaTUqzHDbX_4OBpQ/thumbnail_36x36.jpeg" />
                                </li>
                                <li className="trip-passenger__item">
                                    <img className="trip-passenger" alt="Юрій К (46 р.)" src="https://d1ovtcjitiy70m.cloudfront.net/vi-1/images/avatar/passenger-female-36.png" />
                                </li>
                                <li className="trip-passenger__item">
                                    <span className="trip-passenger trip-passenger--free" />
                                </li>
                                <li className="trip-passenger__item">
                                    <span className="trip-passenger trip-passenger--free" />
                                </li>
                            </ul>
                        </div>

                        <div className="trip-booking-button-area p-3">
                            <button
                                role="button"
                                className={"btn trip-booking-button py-3" + (disableBookingBtn ? " disabled" : "")}
                                onClick={ this.onBookingBtnClick }
                            >
                                { translate('trip_booking.booking_btn') }
                            </button>

                            <BookingModal
                                tripId={ id }
                                maxSeats={ trip.seats }
                                waypoints={ routes }
                                price={ trip.price }
                                start_at={ 1503774120 * 1000 }
                                isOpen={ isOpenBookingModal }
                                onClosed={ this.onBookingClosed }
                                onSuccess={ this.onBookingSuccess }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default localize(TripDetailsContainer, 'locale');
