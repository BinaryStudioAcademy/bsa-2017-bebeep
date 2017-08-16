import React from 'react';
import {tripsLoadSuccess} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Trip from './Trip';

class TripsListContainer extends React.Component {
    render() {
        const tripsView = (this.props.trips.length > 0)
            ? this.props.trips.map(trip => {
                return (
                    <Trip key={trip.id} trip={ trip } editable={this.props.filter === 'upcoming'} deletable={this.props.filter === 'upcoming'} />
                );
            })
            : <p>Trips not found</p>;

        return (
            <div className="row">
                {tripsView}
            </div>
        );
    }
}

const TripsListContainerConnected = connect(
    null,
    (dispatch) => bindActionCreators({tripsLoadSuccess}, dispatch)
)(TripsListContainer);

export default TripsListContainerConnected;
