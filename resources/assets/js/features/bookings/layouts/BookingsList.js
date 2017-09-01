import React from 'react';
import PageHeader from 'app/components/PageHeader';
import LangService from 'app/services/LangService';
import * as lang from '../lang/BookingsList.locale.json';
import {localize} from 'react-localize-redux';
import BookingsContainer from '../components/BookingsContainer';
import { FILTER_PAST, FILTER_UPCOMING } from 'app/services/BookingService';
import { Link } from 'react-router';

class BookingsList extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate, route} = this.props,
            filter = route.path === "bookings/past" ? FILTER_PAST : FILTER_UPCOMING;

        return (
            <div>
                <PageHeader header={translate('bookings_list.my_bookings_header')} />
                <div>
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link to="/bookings" className={"nav-link" + (filter === FILTER_UPCOMING ? " active" : "")}>
                                {translate('bookings_list.upcoming')}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/bookings/past" className={"nav-link" + (filter === FILTER_PAST ? " active" : "")}>
                                {translate('bookings_list.past')}
                            </Link>
                        </li>
                    </ul>
                </div>

                <BookingsContainer filter={filter} />
            </div>
        );
    }
}

export default localize(BookingsList, 'locale');
