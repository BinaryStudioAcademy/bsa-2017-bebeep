import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageHeader from 'app/components/PageHeader';
import TripsListContainer from "../components/TripsListContainer";

import { securedRequest } from 'app/services/RequestService';
import { tripsFilterChanged, tripsLoadSuccess } from '../actions';

class TripsList extends React.Component {

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
        return (
            <div>
                <PageHeader header={'My Trips'}/>

                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link to="/trips/upcoming" className="nav-link" activeClassName="active">
                            Upcoming
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/trips/past" className="nav-link" activeClassName="active">
                            Past
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
        trips: state.tripList.trips
    }),
    (dispatch) => bindActionCreators({tripsLoadSuccess, tripsFilterChanged}, dispatch)
)(TripsList);

export default TripsListConnected;
