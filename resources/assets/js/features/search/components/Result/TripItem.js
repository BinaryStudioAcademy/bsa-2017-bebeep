import React from 'react';
import {Link} from 'react-router';
import {localize} from 'react-localize-redux';
import LangService from '../../../../app/services/LangService';
import moment from 'moment';
import 'features/search/styles/search-trip-item.scss';

class TripItem extends React.Component {

    dateFormat(timestamp) {
        const {translate} = this.props,
            date = moment(timestamp * 1000),
            locale = moment().locale(),
            localeData = moment().locale(locale).localeData(),
            day = _.padStart(date.date(), 2, '0'),
            weekday = _.capitalize(localeData.weekdaysShort(date)),
            month = _.capitalize(localeData.monthsShort(date)),
            minute = _.padStart(date.minute(), 2, '0'),
            hour = _.padStart(date.hour(), 2, '0'),
            now = moment(),
            time = `- ${hour}:${minute}`;
        if (now.isSame(date, 'day')) {
            return `${translate('search_result.today')} ${time}`
        } else if (now.isSame(date.subtract(1, 'day'), 'day')) {
            return `${translate('search_result.tomorrow')} ${time}`
        }
        return `${weekday}. ${day} ${month} ${time}`;
    }

    render() {
        const {trip, translate} = this.props;

        return (
            <Link to={`/trip/${trip.id}`} className="search-trip-item">
                <div className="row">
                    <div className="search-trip-item__user-container col-sm-4">
                        <img src={ trip.driver.data.photo }
                             alt={ trip.driver.data.full_name }
                             className="search-trip-item__user-photo"/>
                        <div className="search-trip-item__user-name"
                             title={ trip.driver.data.full_name }
                        >{ trip.driver.data.full_name }</div>
                        <div className="search-trip-item__user-age">{ translate('search_result.years' + LangService.getNumberForm(trip.driver.data.age), { age: trip.driver.data.age }) }</div>
                    </div>
                    <div className="search-trip-item__trip-container col-sm-8 clearfix">
                        <div className="search-trip-item__description">
                            <div className="search-trip-item__start-date">{ this.dateFormat(trip.start_at) }</div>
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
