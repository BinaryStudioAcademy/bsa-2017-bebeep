import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageHeader from 'app/components/PageHeader';
import TripsListContainer from "../components/TripsListContainer";
import { securedRequest } from 'app/services/RequestService';
import { tripsFilterChanged, tripsLoadSuccess } from '../actions';
import LangService from 'app/services/LangService';
import {getTranslate} from 'react-localize-redux';
import * as lang from '../lang/TripList.locale.json';

class TripsList extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    componentDidMount() {
        this.changeFilter();
        this.loadTrips(TripsList.getFilterName(this.props));
    }

    componentWillReceiveProps(nextProps) {
        this.changeFilter(nextProps);
    }

    changeFilter(nextProps = null) {
        let source = nextProps ? nextProps : this.props;
        let filter = TripsList.getFilterName(source);

        if (nextProps && nextProps.location.pathname === this.props.location.pathname) {
            return;
        }

        if (this.props.filter === filter) {
            return;
        }

        this.props.tripsFilterChanged(filter);
        this.loadTrips(filter);
    }

    static getFilterName(source) {
        return source.location.pathname === '/trips/upcoming' ? 'upcoming' : 'past';
    }

    loadTrips(filter) {
        securedRequest.get('/api/v1/trips/' + filter).then((response) => {
            this.props.tripsLoadSuccess(response.data);
        });
    }

    render() {
        const {translate} = this.props;

        return (
            <div>
                <PageHeader header={translate('my_trips_header')}/>

                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link to="/trips/upcoming" className="nav-link" activeClassName="active">
                            {translate('upcoming')}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/trips/past" className="nav-link" activeClassName="active">
                            {translate('past')}
                        </Link>
                    </li>
                </ul>

                <br/>

                <TripsListContainer filter={this.props.filter} trips={this.props.trips} />
            </div>
        );
    }
}

const TripsListConnected = connect(
    (state) => ({
        filter: state.tripList.filter,
        trips: state.tripList.trips,
        translate: getTranslate(state.locale)
    }),
    (dispatch) => bindActionCreators({tripsLoadSuccess, tripsFilterChanged}, dispatch)
)(TripsList);

export default TripsListConnected;
