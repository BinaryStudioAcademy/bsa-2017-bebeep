import React from 'react';
import { localize } from 'react-localize-redux';

import { RouteBase } from './Route';
import { DriverIcon, SeatIcon } from 'app/components/Icons';


class TripRoutesPassengers extends React.Component {

    isStartPoint(position) {
        return position === 0;
    }

    isWayPoint(position) {
        return position !== 0;
    }

    isEndPoint(position, count) {
        return position === count - 1;
    }

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

        return routes.map((route, i) => {
            const showDriver = this.isStartPoint(i),
                showStartPoint = this.isStartPoint(i),
                showWayPoint = this.isWayPoint(i),
                showEndPoint = this.isEndPoint(i, routes.length);

            return (
                <RouteBase
                    key={i}
                    route={route}
                    driver={driver}
                    showDriver={showDriver}
                    showStartPoint={showStartPoint}
                    showWayPoint={showWayPoint}
                    showEndPoint={showEndPoint}
                />
            );
        });
    }

    render() {
        const { translate } = this.props;

        return (
            <section className="block-border px-3 pt-3 pb-2 mt-4">
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
