import React from 'react';
import { Link } from 'react-router';
import { localize } from 'react-localize-redux';

import { getDriverAvatar } from 'app/services/PhotoService';
import LangService from 'app/services/LangService';
import DateTimeHelper from 'app/helpers/DateTimeHelper';

import 'features/search/styles/search-trip-item.scss';


class TripItem extends React.Component {

    formatStartAt() {
        const { trip, translate } = this.props;

        return DateTimeHelper.dateFormatLocale({
            timestamp: trip.start_at,
            getTranslate: translate,
        });
    }

    render() {
        const { trip, translate } = this.props,
            startedAt = this.formatStartAt();

        return (
            <Link to={`/trip/${trip.id}`} className="search-trip-item">
                <div className="row search-trip-item-block">
                    <div className="search-trip-item__user-container col-sm-4">


                    </div>

                    <div className="search-trip-item__trip-container col-sm-8 clearfix">

                    </div>
                </div>
            </Link>
        )
    }
}

export default localize(TripItem, 'locale');