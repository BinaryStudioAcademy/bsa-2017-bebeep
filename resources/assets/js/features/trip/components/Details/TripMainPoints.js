import React from 'react';
import { localize } from 'react-localize-redux';

class TripMainPoints extends React.Component {

    render() {
        const { translate, startPoint, endPoint } = this.props;
        //translate('trip_details.full_route_link')

        return (
            <div className="trip-main-points">
                <i className="trip-detail-icon fa fa-road mr-2" aria-hidden="true" />
                <span className="trip-start-point">
                    { startPoint }
                </span>
                <i className="fa fa-long-arrow-right mx-2" aria-hidden="true" />
                <span className="trip-end-point">
                    { endPoint }
                </span>
            </div>
        )
    }
}

export default localize(TripMainPoints, 'locale');
