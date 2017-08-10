import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getTrips } from "../actions";
import { bindActionCreators } from 'redux';
import TripsListItem from './TripsListItem';

class ListWithTripsItems extends  Component{
    constructor(props) {
        super(props);

       this.props.getTrips();
    }

    shouldComponentUpdate(nextProps, nextState) {
        const oldState = this.props.tripsState,
            newState = nextProps.tripsState;

        return newState.trips.length !== oldState.trips.length;
    }

    render() {
        let trips = this.props.tripsState.trips;
        console.log(trips);
        let tripsList = (trips.length >= 1)
            ?
            trips.map(function (tripData, index) {
                return (
                    <TripsListItem  key={index} tripData={tripData}/>
                );
            }) :null;


        return (
            <ul className="list-group">
                {tripsList}
            </ul>
        );
    }
}

const ListWithTripsItemsConnected = connect(
    (state) => {
        return { tripsState: state.tripsList };
    },
    (dispatch) => bindActionCreators({ getTrips }, dispatch)

)(ListWithTripsItems);

export default ListWithTripsItemsConnected;


