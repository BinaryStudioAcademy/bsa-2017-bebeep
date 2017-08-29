import React from 'react';
import { localize } from 'react-localize-redux';

import { RouteBase } from './Route';
import { DriverIcon, SeatIcon } from 'app/components/Icons';


class TripRoutesPassengers extends React.Component {

    renderSeatsIcons() {
        const maxSeats = this.props.maxSeats;

        return [...Array(maxSeats)].map((n, i) =>
            <th key={i}>
                <SeatIcon className="trip-routes__head-icon" />
            </th>
        );
    }

    renderRoutes() {
        const { routes, driver } = this.props;

        return routes.map((route, i) =>
            <RouteBase
                key={i}
                position={i}
                route={route}
                driver={driver}
                count={routes.length}
            />
        );
    }

    render() {
        const { translate } = this.props;

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
                            { this.renderSeatsIcons() }
                          </tr>
                        </thead>

                        <tbody>{ this.renderRoutes() }</tbody>
                    </table>
                </div>
            </section>
        )
    }
}

export default localize(TripRoutesPassengers, 'locale');
