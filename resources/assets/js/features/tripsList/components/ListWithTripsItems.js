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
       const trips = this.props.tripsState.trips;

        let tripsList =
            trips.map(function (tripData, index) {
                return (
                    <TripsListItem  key={index} tripsData={tripsData}/>
                );
            });


        return (
            <div>
                {tripsList}
            </div>
        );
    }
}

const ListWithTripsItemsConnected = connect(
    (state) => {
        return { tripsState: state.trips };
    },
    (dispatch) => bindActionCreators({ getTrips }, dispatch)

)(ListWithTripsItems);

export default ListWithTripsItemsConnected;


