import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Trip from './Trip';
import { tripsLoadSuccess } from '../actions';
import {getTranslate} from 'react-localize-redux';

class TripsListContainer extends React.Component {
    render() {
        const {translate} = this.props;
        const tripsView = (this.props.trips.length > 0)
            ? this.props.trips.map(trip => {
                return (
                    <Trip key={trip.id} trip={ trip } editable={this.props.filter === 'upcoming'} deletable={this.props.filter === 'upcoming'} />
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
    state => ({translate: getTranslate(state.locale)}),
    (dispatch) => bindActionCreators({tripsLoadSuccess}, dispatch)
)(TripsListContainer);

export default TripsListContainerConnected;
