import React from 'react';
import PropTypes from 'prop-types';
import { localize } from 'react-localize-redux';
import TripMapModal from '../../Modals/TripMapModal';

class TripMainPoints extends React.Component {

    constructor() {
        super();

        this.state = {
            isShowTrip: false
        };

        this.toggleTrip = this.toggleTrip.bind(this);
    }

    toggleTrip() {
        this.setState({isShowTrip: !this.state.isShowTrip});
    }

    renderRouteTitle() {
        const { startPoint, endPoint } = this.props;

        return (
            <span>
                <span className="trip-start-point">
                    { startPoint }
                </span>
                <i className="fa fa-long-arrow-right mx-2" aria-hidden="true" />
                <span className="trip-end-point">
                    { endPoint }
                </span>
            </span>
        );
    }

    render() {
        const { translate, waypoints } = this.props,
            routeTitle = this.renderRouteTitle();

        return (
            <div className="trip-main-points mt-3 mb-4 ml-3">
                { routeTitle }
                <TripMapModal className="trip-main-points__route-map-link"
                    waypoints={ waypoints }
                    modalHeader={ routeTitle }
                />
            </div>
        )
    }
}

TripMainPoints.PropTypes = {
    startPoint: PropTypes.string.isRequired,
    endPoint: PropTypes.string.isRequired,
    waypoints: PropTypes.array.isRequired
};

export default localize(TripMainPoints, 'locale');
