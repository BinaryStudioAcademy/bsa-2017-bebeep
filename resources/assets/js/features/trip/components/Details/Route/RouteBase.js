import React from 'react';

import RoutePoint from './RoutePoint';
import RouteUser from './RouteUser';

class RouteBase extends React.Component {

    isShowDriver() {
        return this.props.showDriver;
    }

    isShowStartPoint() {
        return this.props.showStartPoint;
    }

    isShowWayPoint() {
        return this.props.showWayPoint;
    }

    isShowEndPoint() {
        return this.props.showEndPoint;
    }

    renderEndPoint() {
        const showEndPoint = this.isShowEndPoint(),
            route = this.props.route;

        if (!showEndPoint) {
            return null;
        }

        return (
            <RoutePoint
                location={route.to}
                endTime={route.end_time}
                showEndPoint={showEndPoint}
            />
        );
    }

    renderDriver() {
        const { route, driver } = this.props;

        if (!this.isShowDriver()) {
            return null;
        }

        return (
            <RouteUser
                type="driver"
                uniqueKey={ `${route.id}-${driver.id}-d` }
                user={ driver }
            />
        );
    }

    renderPassenger() {
        const route = this.props.route;

        return route.bookings.data.map((booking) =>
            [...Array(booking.seats)].map((n, i) => {
                const passenger = booking.user.data,
                    uniqueKey = `${route.id}-${passenger.id}-${i}`;

                return (
                    <td key={ uniqueKey } className="trip-routes__person-place">
                        <RouteUser
                            type="passenger"
                            uniqueKey={ uniqueKey }
                            user={ passenger }
                        />
                    </td>
                );
            })
        );
    }

    renderFreeSeats() {
        const freeSeats = this.props.route.free_seats;

        return [...Array(freeSeats)].map((n, i) =>
            <td key={i} className="trip-routes__person-place" />
        );
    }

    render() {
        const { route } = this.props,
            showStartPoint = this.isShowStartPoint(),
            showWayPoint = this.isShowWayPoint();

        return (
            <tr>
                <th scope="row" className="trip-routes__route">
                    <RoutePoint
                        location={route.from}
                        startTime={route.start_time}
                        showStartPoint={showStartPoint}
                        showWayPoint={showWayPoint}
                    />
                    { this.renderEndPoint() }
                </th>

                <td className="trip-routes__person-place trip-routes__person-place--driver">
                    { this.renderDriver() }
                </td>

                { this.renderPassenger() }
                { this.renderFreeSeats() }
            </tr>
        )
    }
}

export default RouteBase;
