import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Trip from './Trip';
import { tripsLoadSuccess } from '../actions';
import {getTranslate} from 'react-localize-redux';
import { FILTER_UPCOMING } from 'app/services/BookingService';

class TripsListContainer extends React.Component {
    render() {
        const {translate, trips, list, filter} = this.props,
            tripsView = (!_.isEmpty(trips))
            ? list.map(t => {
                const trip = trips[t];
                return (
                    <Trip key={trip.id} trip={ trip } editable={filter === FILTER_UPCOMING} deletable={filter === FILTER_UPCOMING} />
                );
            })
            : <p>{translate('trip_list.trips_not_found')}</p>;

        return (
            <div className="row">
                {tripsView}
            </div>
        );
    }
}

const TripsListContainerConnected = connect(
    state => ({
        translate: getTranslate(state.locale),
        trips: state.tripList.trips,
        list: state.tripList.list
    }),
    (dispatch) => bindActionCreators({tripsLoadSuccess}, dispatch)
)(TripsListContainer);

export default TripsListContainerConnected;
