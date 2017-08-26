import React from 'react';
import { localize } from 'react-localize-redux';

class TripMainInfo extends React.Component {

    render() {
        const { translate, startPoint, endPoint, startAt } = this.props;

        return (
            <dl className="row trip-main-info mt-4">
                <dt className="trip-main-info__label col-sm-3">
                    { translate('trip_details.start_point') }
                </dt>
                <dd className="trip-main-info__value col-sm-9">
                    <span className="trip-start-point-address trip-point-icon">
                        { startPoint }
                    </span>
                </dd>

                <dt className="trip-main-info__label col-sm-3">
                    { translate('trip_details.end_point') }
                </dt>
                <dd className="trip-main-info__value col-sm-9">
                    <span className="trip-end-point-address trip-point-icon trip-point-icon--end">
                        { endPoint }
                    </span>
                </dd>

                <dt className="trip-main-info__label col-sm-3">
                    { translate('trip_details.start_time') }
                </dt>
                <dd className="trip-main-info__value col-sm-9">
                    <i className="trip-detail-icon fa fa-calendar mr-2" aria-hidden="true" />
                    <span className="trip-date-start-at">{ startAt }</span>
                </dd>
            </dl>
        )
    }
}

export default localize(TripMainInfo, 'locale');
