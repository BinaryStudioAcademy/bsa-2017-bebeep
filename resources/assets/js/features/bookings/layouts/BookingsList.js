import React from 'react';
import PageHeader from 'app/components/PageHeader';
import LangService from 'app/services/LangService';
import * as lang from '../lang/BookingsList.locale.json';
import {localize} from 'react-localize-redux';
import BookingsContainer from '../components/BookingsContainer';
import { Link } from 'react-router';

class BookingsList extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {translate, route} = this.props;

        return (
            <div>
                <PageHeader header={translate('bookings_list.my_bookings_header')} />
                <div>
                    <ul className="nav nav-pills">
                        <li className="nav-item">
                            <Link to="/bookings/upcoming" className="nav-link" activeClassName="active">
                                {translate('bookings_list.upcoming')}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/bookings/past" className="nav-link" activeClassName="active">
                                {translate('bookings_list.past')}
                            </Link>
                        </li>
                    </ul>
                </div>

                <BookingsContainer filter={route.path} />
            </div>
        );
    }
}

export default localize(BookingsList, 'locale');
