import React from 'react';

const BASE_CLASS_NAME = 'trip-routes__point trip-point-icon';

class RoutePoint extends React.Component {

    isShowStartPoint() {
        return this.props.showStartPoint;
    }

    isShowWayPoint() {
        return this.props.showWayPoint;
    }

    isShowEndPoint() {
        return this.props.showEndPoint;
    }

    getClassName() {
        let className = BASE_CLASS_NAME;

        if (this.isShowStartPoint()) {
            className += ' trip-routes__point--start trip-point-icon--start';
        } else if (this.isShowEndPoint()) {
            className += ' trip-routes__point--end trip-point-icon--end';
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
