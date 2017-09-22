import React from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTranslate } from 'react-localize-redux';
import moment from 'moment';

import LangService from 'app/services/LangService';
import {getDriverAvatar} from 'app/services/PhotoService';
import { convertTripPrice } from 'app/services/TripService';
import {getCityLocation} from 'app/helpers/TripHelper';
import DateTimeHelper from 'app/helpers/DateTimeHelper';

import 'features/search/styles/compound-trip-item.scss';
import 'features/search/styles/search-trip-item.scss';


class CompoundTripItem extends React.Component {

    formatStartAt() {
        const {collection, translate} = this.props;

        return DateTimeHelper.dateFormatLocale({
            timestamp: moment.utc(collection.start_at, 'YYYY-MM-DD HH:mm:ss').unix(),
            getTranslate: translate,
        });
    }

    numberFreeSeats() {
        const {collection, translate} = this.props;
        var seats = 0;

        collection.bookings.map(booking =>
            seats = seats + booking.seats);
        return collection.trip.seats-seats;
    }

    render() {
        const {collection, translate, activeCurrency} = this.props,
            startedAt = this.formatStartAt(),
            fromName = getCityLocation(collection.from),
            toName = getCityLocation(collection.to);

        const tripPrice = convertTripPrice({
            price: collection.price,
            currency_id: collection.trip.currency_id,
        });

        return (
            <Link to={`/trip/${collection.trip.id}`} className="compound-search-trip-item">
                <div className="row search-trip-item-block">
                    <div className="search-trip-item__user-container col-sm-4">

                        <img className="search-trip-item__user-photo"
                             src={getDriverAvatar(collection.trip.user)}
                             alt={collection.trip.user.first_name + ' ' + collection.trip.user.last_name}
                        />

                        <div className="search-trip-item__user-name"
                             title={collection.trip.user.first_name + ' ' + collection.trip.user.last_name}
                        >
                            {collection.trip.user.first_name + ' ' + collection.trip.user.last_name}
                        </div>

                        <div className="search-trip-item__user-age">
                            {translate('user.age', {
                                age: DateTimeHelper.getUserYearsOld(collection.trip.user.birth_date)
                            })}
                        </div>

                    </div>

                    <div className="search-trip-item__trip-container col-sm-8 clearfix">
                        <div className="search-trip-item__description">

                            <div className="search-trip-item__start-date">{startedAt}</div>

                            <div className="search-trip-item__route">

                            </div>

                            <div className="search-trip-item__from">
                                <span className="search-trip-item__from-ico"/>
                                {fromName}
                            </div>
                            <div className="search-trip-item__to">
                                <span className="search-trip-item__from-ico search-trip-item__from-end"/>
                                {toName}
                            </div>
                        </div>
                        <div className="search-trip-item__offer">

                            <div className="search-trip-item__price">
                                {parseInt(tripPrice)}
                                <span className="search-trip-item__price-currency">
                                    {activeCurrency.sign}
                                </span>
                            </div>

                            <div className="search-trip-item__price-sign">
                                {translate('search_result.per_passenger')}
                            </div>

                            <div className="search-trip-item__free-seats">
                                <span className="search-trip-item__free-seats-text">
                                    {this.numberFreeSeats()}
                                </span> {
                                translate('dropdown.free_seats.count_' + LangService.getNumberForm(
                                    this.numberFreeSeats()
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}

export default connect(
    state => ({
        translate: getTranslate(state.locale),
        activeCurrency: state.currency.activeCurrency,
    })
)(CompoundTripItem);
