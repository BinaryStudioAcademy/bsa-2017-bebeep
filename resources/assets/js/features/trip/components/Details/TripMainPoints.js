import React from 'react';
import { localize } from 'react-localize-redux';

class TripMainPoints extends React.Component {

    render() {
        const { translate, startPoint, endPoint } = this.props;

        return (
            <div className="trip-main-points mt-3 mb-4 ml-3">
                <span className="trip-start-point">
                    { startPoint }
                </span>
                <i className="fa fa-long-arrow-right mx-2" aria-hidden="true" />
                <span className="trip-end-point">
                    { endPoint }
                </span>
                <a href="#" className="trip-main-points__route-map-link ml-3">
                    <i className="trip-detail-icon fa fa-road mr-2" aria-hidden="true" />
                    { translate('trip_details.route_map_link') }
                </a>
            </div>
        )
    }
}

export default localize(TripMainPoints, 'locale');
