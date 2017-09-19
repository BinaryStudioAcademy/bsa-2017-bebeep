import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {Link} from 'react-router';
import {localize} from 'react-localize-redux';
import { bindActionCreators } from 'redux';
import { getTranslate } from 'react-localize-redux';

import {getDriverAvatar} from 'app/services/PhotoService';
import LangService from 'app/services/LangService';
import DateTimeHelper from 'app/helpers/DateTimeHelper';
import CurrencyService from 'features/currency/services/CurrencyService';

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

    convertTripCurrency() {
        const trip = this.props.collection.trip;
        const fakeData = {id:1, code:'USD', sign:'$', rate:1, is_main:true};

        return CurrencyService.convert(trip.price, fakeData);
    }

    render() {
        const {collection, translate} = this.props,
            startedAt = this.formatStartAt();

        let from = collection.from.address_components;
        let to = collection.to.address_components;
        let fromName = (from[0].long_name === parseInt(from[0].long_name, 6)) ? from[1].long_name : from[0].long_name;
        let toName = (to[0].long_name === parseInt(to[0].long_name, 6)) ? to[1].long_name : to[0].long_name;
        const tripPrice = this.convertTripCurrency();
        const currency = CurrencyService.getActiveCurrency();

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
                                <span className="search-trip-item__price-currency">{currency.sign}</span>
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
        )
    }
}

export default connect(
    state => ({
        translate: getTranslate(state.locale),
        activeCurrency: state.currency.activeCurrency,
    })
)(CompoundTripItem);

// export default localize(CompoundTripItem, 'locale');
