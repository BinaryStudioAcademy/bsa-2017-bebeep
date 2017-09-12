import React from 'react';
import { localize } from 'react-localize-redux';

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

    getTime() {
        const { startTime, endTime } = this.props;

        return this.isShowEndPoint() ? endTime : startTime;
    }

    getTimeNote() {
        if (this.isShowStartPoint()) {
            return null;
        }

        const { translate } = this.props;

        const noteText = this.isShowWayPoint()
            ? translate('trip_details.routes_passengers.route_start_time')
            : translate('trip_details.routes_passengers.route_end_time');

        return <div className="trip-routes__point-time-note">{ noteText }</div>;
    }

    render() {
        return (
            <div className={ this.getClassName() }>
                <div className="trip-routes__point-info">
                    <div className="trip-routes__point-address">{ this.getAddress() }</div>
                    <div className="trip-routes__point-time">{ this.getTime() }</div>
                    { this.getTimeNote() }
                </div>
            </div>
        )
    }
}

RoutePoint.defaultProps = {
    startTime: null,
    endTime: null,
};

export default localize(RoutePoint, 'locale');
