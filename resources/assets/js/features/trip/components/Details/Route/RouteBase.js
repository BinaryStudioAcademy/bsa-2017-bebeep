import React from 'react';

import RoutePoint from './RoutePoint';
import RouteUser from './RouteUser';

class RouteBase extends React.Component {

    isThisLastPoint() {
        const { position, count } = this.props;

        return position === count - 1;
    }

    renderLastPoint() {
        if (!this.isThisLastPoint()) {
            return null;
        }

        const route = this.props.route;

        return (
            <RoutePoint
                location={route.to}
                position="last"
            />
        );
    }

    renderDriver() {
        const { position, route, driver } = this.props;

        if (position !== 0) {
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
                    <td key={ uniqueKey }>
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
            <td key={i}></td>
        );
    }

    render() {
        const { position, route, count } = this.props;

        return (
            <tr>
                <th scope="row">
                    <RoutePoint
                        location={route.from}
                        position={position}
                        count={count}
                    />
                    { this.renderLastPoint() }
                </th>

                <td className="trip-routes__driver-cell">
                    { this.renderDriver() }
                </td>

                { this.renderPassenger() }
                { this.renderFreeSeats() }
            </tr>
        )
    }
}

export default RouteBase;
