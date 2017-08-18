import React from 'react';
import { Link } from 'react-router';

import 'features/search/styles/search-trip-item.scss';

class TripItem extends React.Component {

    render() {
        const {trip} = this.props;
        return (
            <Link to={`/trip/${trip.id}`} className="search-trip-item">
                <div className="row">
                    <div className="search-trip-item__user-container col-sm-4">
                        <img src={ trip.user.photo + '?' + trip.id }
                             alt={ trip.user.full_name }
                             className="search-trip-item__user-photo"/>
                        <div className="search-trip-item__user-name"
                             title={ trip.user.full_name }
                        >{ trip.user.full_name }</div>
                        <div className="search-trip-item__user-age">{ trip.user.age } yrs.</div>
                    </div>
                    <div className="search-trip-item__trip-container col-sm-8 clearfix">
                        <div className="search-trip-item__description">
                            <div className="search-trip-item__start-date">{ trip.start_date }</div>
                            <div className="search-trip-item__route">
                                {trip.route.points.map((route) =>
                                    <span className={"search-trip-item__route-item" +
                                        (route.id == trip.route.from.id ? ' search-trip-item__route-item_from' : '') +
                                        (route.id == trip.route.to.id ? ' search-trip-item__route-item_to' : '')
                                    } key={route.id}>
                                        {route.point}
                                    </span>
                                )}
                            </div>
                            <div className="search-trip-item__from">
                                <i className="fa fa-circle-o search-trip-item__from-ico" title="from" /> {trip.route.from.point}
                            </div>
                            <div className="search-trip-item__to">
                                <i className="fa fa-circle-o search-trip-item__to-ico"  title="to" /> {trip.route.to.point}
                            </div>
                        </div>
                        <div className="search-trip-item__offer">
                            <div className="search-trip-item__price"><span className="search-trip-item__price-currency">$</span>{trip.price}</div>
                            <div className="search-trip-item__price-sign">per passanger</div>
                            <div className="search-trip-item__free-seats">
                                <span className="search-trip-item__free-seats-text">
                                    {trip.seats}
                                </span> free seat(s)</div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}

export default TripItem;
