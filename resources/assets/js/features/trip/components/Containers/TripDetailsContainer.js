import React from 'react';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import {localize} from 'react-localize-redux';

import TripDetailsService from 'features/trip/services/TripDetailsService';

import TripDriver from '../Details/TripDriver';
import TripVehicle from '../Details/TripVehicle';


class TripDetailsContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            trip: null,
            routes: null,
            driver: null,
            vehicle: null,
        };
    }

    componentDidMount() {
        TripDetailsService.getDetails(this.props.id)
            .then(response => {
                response = TripDetailsService.transformData(response.data);
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

    render() {
        const { trip, routes, driver, vehicle } = this.state;
        //const { translate } = this.props;
        //translate('edit_trip.cant_load_this_trip')

        if (!trip) {
            return (
                <div />
            );
        }

        const startPoint = routes[0].from;
        const endPoint = _.last(routes).to;

        return (
            <div className="row">
                <div className="col-md-8">
                    <div>
                        <div className="trip-main-points">
                            <span className="trip-start-point">
                                { startPoint.short_address }
                            </span>
                            <i className="fa fa-long-arrow-right mx-2" aria-hidden="true" />
                            <span className="trip-end-point">
                                { endPoint.short_address }
                            </span>
                        </div>

                        <dl className="row trip-main-info">
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

                    <section>
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
                    <div className="d-flex">
                        <div className="trip-price">
                            <p className="trip-price-value">265 &#8372;</p>
                            <p>з пасажира</p>
                        </div>
                        <div className="trip-places-free">
                            <p><span>2</span></p>
                            <p>вільні місця</p>
                        </div>
                    </div>

                    <div className="trip-passengers">
                        <p>Пасажири в цій поїздці</p>
                        <ul className="list-unstyled">
                            <li>
                                <span>1</span>
                            </li>
                            <li>
                                <span>1</span>
                            </li>
                            <li>
                                <span>0</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default TripDetailsContainer;
