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

    render() {
        const { translate, startPoint, endPoint, waypoints } = this.props;

        return (
            <div className="trip-main-points mt-3 mb-4 ml-3">
                <span className="trip-start-point">
                    { startPoint }
                </span>
                <i className="fa fa-long-arrow-right mx-2" aria-hidden="true" />
                <span className="trip-end-point">
                    { endPoint }
                </span>
                <TripMapModal className="trip-main-points__route-map-link" waypoints={waypoints} />
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
