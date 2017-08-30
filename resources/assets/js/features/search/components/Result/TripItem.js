import React from 'react';
import { Link } from 'react-router';
import { localize } from 'react-localize-redux';

import { getDriverAvatar } from 'app/services/PhotoService';
import LangService from 'app/services/LangService';
import DateTimeHelper from 'app/helpers/DateTimeHelper';

import 'features/search/styles/search-trip-item.scss';


class TripItem extends React.Component {

    render() {
        const {trip, translate} = this.props,
            date = DateTimeHelper.dateFormat(trip.start_at);

        return (
            <Link to={`/trip/${trip.id}`} className="search-trip-item">
                <div className="row search-trip-item-block">
                    <div className="search-trip-item__user-container col-sm-4">
                        <img className="search-trip-item__user-photo"
                             src={ getDriverAvatar(trip.driver.data) }
                             alt={ trip.driver.data.full_name }
                        />
                        <div className="search-trip-item__user-name"
                             title={ trip.driver.data.full_name }
                        >{ trip.driver.data.full_name }</div>
                        <div className="search-trip-item__user-age">{ translate('search_result.years' + LangService.getNumberForm(trip.driver.data.age), { age: trip.driver.data.age }) }</div>
                    </div>
                    <div className="search-trip-item__trip-container col-sm-8 clearfix">
                        <div className="search-trip-item__description">
                            <div className="search-trip-item__start-date">{
                                date.date === 'today'
                                    ? translate('today', {time: date.time})
                                    : date.date === 'tomorrow'
                                        ? translate('tomorrow', {time: date.time})
                                        : `${date.date} - ${date.time}`
                            }</div>
                            <div className="search-trip-item__route">
                                {trip.routes.data.map((route) =>
                                    <span className={"search-trip-item__route-item" +
                                        (route.wanted ? ' search-trip-item__route-item_selected' : '')
                                    } key={route.point}>
                                        {route.point}
                                    </span>
                                )}
                            </div>
                            <div className="search-trip-item__from">
                                <i className="fa fa-circle-o search-trip-item__from-ico" title="from" /> {trip.from.data.point}
                            </div>
                            <div className="search-trip-item__to">
                                <i className="fa fa-circle-o search-trip-item__to-ico"  title="to" /> {trip.to.data.point}
                            </div>
                        </div>
                        <div className="search-trip-item__offer">
                            <div className="search-trip-item__price"><span className="search-trip-item__price-currency">$</span>{trip.price}</div>
                            <div className="search-trip-item__price-sign">{translate('search_result.per_passenger')}</div>
                            <div className="search-trip-item__free-seats">
                                <span className="search-trip-item__free-seats-text">
                                    {trip.seats}
                                </span> {translate('search_result.free_seats' + LangService.getNumberForm(trip.seats))}</div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}

export default localize(TripItem, 'locale');
