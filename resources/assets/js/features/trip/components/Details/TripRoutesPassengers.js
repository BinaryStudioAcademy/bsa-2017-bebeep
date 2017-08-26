import React from 'react';
import { localize } from 'react-localize-redux';

import TripRouteUser from './TripRouteUser';
import { DriverIcon, SeatIcon } from './Icons';


class TripRoutesPassengers extends React.Component {

    render() {
        const { translate, maxSeats, routes, driver } = this.props;

        return (
            <section className="block-border p-3 mt-4">
                <header className="trip-section-header">
                    <h3 className="h5">
                        { translate('trip_details.routes_passengers.header') }
                    </h3>
                </header>

                <div className="table-responsive">
                    <table className="table trip-routes">
                        <thead>
                          <tr>
                            <th />
                            <th>
                                <DriverIcon className="trip-routes__head-icon" />
                            </th>
                        {
                          [...Array(maxSeats)].map((n, i) =>
                            <th key={i}>
                                <SeatIcon className="trip-routes__head-icon" />
                            </th>
                          )
                        }
                          </tr>
                        </thead>
                        <tbody>
                        {
                          routes.map((route, i) =>
                            <tr key={i}>
                              <th scope="row">
                                <span className={"trip-routes__point trip-point-icon" +
                                    (i !== 0 ? ' trip-point-icon--waypoint' : '')
                                }>
                                    <span className="trip-routes__point-info">
                                        { route.from.short_address }
                                    </span>
                                </span>

                              { i === routes.length - 1 &&
                                <span className="trip-routes__point trip-routes__point--end trip-point-icon trip-point-icon--end">
                                    <span className="trip-routes__point-info">
                                        { route.to.short_address }
                                    </span>
                                </span>
                              }
                              </th>

                              <td className="trip-routes__driver-cell">
                              { i === 0 &&
                                <TripRouteUser
                                    type="driver"
                                    uniqueKey={ `${route.id}-${driver.id}-d` }
                                    user={ driver }
                                />
                              }
                              </td>

                              {
                                route.bookings.data.map((booking) =>
                                  [...Array(booking.seats)].map((n, i) => {
                                    const passenger = booking.user.data;
                                    const uniqueKey = `${route.id}-${passenger.id}-${i}`;

                                    return <td key={ uniqueKey }>
                                        <TripRouteUser
                                            type="passenger"
                                            uniqueKey={ uniqueKey }
                                            user={ passenger }
                                        />
                                    </td>
                                  })
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
