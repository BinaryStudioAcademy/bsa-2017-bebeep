import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getTrips, filterPast,filterUpcoming } from "../actions";
import { bindActionCreators } from 'redux';
import TripsListItem from './TripsListItem';
import { Link } from 'react-router';
import './css/ListWithTripsItems.scss';

class ListWithTripsItems extends  Component{
    constructor(props) {
        super(props);

        this.filterPast = this.filterPast.bind(this);
        this.filterUpcoming = this.filterUpcoming.bind(this);
        this.props.getTrips();
        this.props.filterPast();
    }

    shouldComponentUpdate(nextProps, nextState) {
        const oldState = this.props.tripsState,
            newState = nextProps.tripsState;

        return newState.filtered.length !== oldState.filtered.length+1;
    }

    filterPast(){
        this.props.filterPast();
    }

    filterUpcoming(){
        this.props.filterUpcoming();
    }

    render() {
        let trips  = this.props.tripsState.filtered;
        let tripsList = (trips.length > 0)
            ?
            trips.map(function (tripData, index) {
                return (
                    <TripsListItem  key={index} tripData={tripData}/>
                );
            }) : 'No trips';

        return (
            <div>
                <div className="tabs-buttons">
                    <input type="button" className="btn btn-block tab-button" value="Past trips" onClick={this.filterPast} />
                    <input type="button" className="btn btn-block tab-button" value="Upcoming trips" onClick={this.filterUpcoming} />
                </div>
                    <ul className="list-group">
                        {tripsList}
                    </ul>
            </div>
        );
    }
}

const ListWithTripsItemsConnected = connect(
    (state) => {
        return { tripsState: state.tripsList };
    },
    (dispatch) => bindActionCreators({  getTrips, filterPast,filterUpcoming }, dispatch)

)(ListWithTripsItems);

export default ListWithTripsItemsConnected;


