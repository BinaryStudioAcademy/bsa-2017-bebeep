import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { getTrips, filterPast,filterUpcoming } from "../actions";
import TripsListItem from './TripsListItem';
import './css/ListWithTripsItems.scss';

class ListWithTripsItems extends  Component{
    constructor(props) {
        super(props);
        this.props.getTrips();
        this.props.filterPast();
    }

    shouldComponentUpdate(nextProps, nextState) {
        const oldState = this.props.tripsState,
            newState = nextProps.tripsState;

        return newState.filtered.length !== oldState.filtered.length+1;
    }

    render() {
        let trips  = this.props.tripsState.filtered;
        let tripsList = 'No trips';

        if(trips.length > 0){
            tripsList = trips.map(function (tripData, index) {
                return (
                    <TripsListItem  key={index} tripData={tripData}/>
                );
            });
        }

        return (
            <div>
                <div className="tabs-buttons">
                    <div className="tab-button">
                        <input type="button" className="btn btn-secondary tab-button" value="Past trips" onClick={this.props.filterPast} />
                    </div>
                    <div className="tab-button">
                        <input type="button" className="btn btn-secondary tab-button" value="Upcoming trips" onClick={this.props.filterUpcoming} />
                    </div>
                </div>

                <ul className="list-group">
                    {tripsList}
                </ul>

            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        tripsState: state.tripsList
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getTrips, filterPast,filterUpcoming}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ListWithTripsItems);



