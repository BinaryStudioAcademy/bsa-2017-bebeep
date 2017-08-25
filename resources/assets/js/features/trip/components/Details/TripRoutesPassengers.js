import React from 'react';
import { localize } from 'react-localize-redux';

import TripPassenger from './TripPassenger';
import TripDetailsService from 'features/trip/services/TripDetailsService';


class TripRoutesPassengers extends React.Component {

    render() {
        const { translate, maxSeats, routes } = this.props;

        console.log(maxSeats);
        console.log(routes);

        return (
            <section className="block-border p-3 mt-4">
                <header className="trip-section-header">
                    <h3 className="h5">
                        { translate('trip_details.routes_passengers.header') }
                    </h3>
                </header>

                <div className="table-responsive">
                    <table className="table table-bordered trip-routes">
                        <thead>
                          <tr>
                            <th></th>
                            <th>Driver</th>
                        {
                          [...Array(maxSeats)].map((n, i) =>
                            <th key={i}>Pass {i}</th>
                          )
                        }
                          </tr>
                        </thead>
                        <tbody>
                        {
                          routes.map((route, i) =>
                            <tr key={i}>
                              <th scope="row">
                                <span className="trip-routes__point">
                                    { route.from.short_address }
                                </span>

                              { i === routes.length - 1 &&
                                <span className="trip-routes__point trip-routes__point--end">
                                    { route.to.short_address }
                                </span>
                              }
                              </th>

                              <td></td>

                              {
                                route.bookings.data.map((booking) =>
                                  [...Array(booking.seats)].map((n, i) =>
                                     <td key={i}>
                                        <TripPassenger
                                            passenger={ booking.user.data }
                                            age={ TripDetailsService.getUserAge( booking.user.data ) }
                                        />
                                    </td>
                                  )
                                )
                              }

                              {
                                [...Array(maxSeats - route.busy_seats - 1)].map((n, i) =>
                                  <td key={i}></td>
                                )
                              }

                            </tr>
                          )
                        }
                        </tbody>
                    </table>
                </div>
            </section>
        )
    }
}

export default localize(TripRoutesPassengers, 'locale');
