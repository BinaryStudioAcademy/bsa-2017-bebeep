import React from 'react';

const BASE_CLASS_NAME = 'trip-routes__point trip-point-icon';

class RoutePoint extends React.Component {

    isThisWayPoint() {
        return this.props.position !== 0;
    }

    isThisLastPoint() {
        const position = this.props.position;

        return position === 'last';
    }

    getClassName() {
        let className = BASE_CLASS_NAME;

        if (this.isThisLastPoint()) {
            className += ' trip-routes__point--end trip-point-icon--end';
        } else if (this.isThisWayPoint()) {
            className += ' trip-point-icon--waypoint';
        }

        return className;
    }

    getAddress() {
        const location = this.props.location;

        return location.short_address;
    }

    render() {
        const className = this.getClassName(),
            address = this.getAddress();

        return (
            <span className={ className }>
                <span className="trip-routes__point-info">
                    { address }
                </span>
            </span>
        )
    }
}

export default RoutePoint;
