import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { getTrips, filterPast,filterUpcoming } from "../actions";
import TripsListItem from './TripsListItem';
import './css/ListWithTripsItems.scss';

class ListWithTripsItems extends  Component{

    constructor(props){
        super(props);
        this.props.getTrips();
        this.props.filterPast();
    }
    componentDidMount() {
         this.props.filterPast();
    }

    render() {
        let trips  = this.props.tripsState.filtered;
        let tripsList = 'No trips';
        let modalData = this.props.tripsState.modalData;

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
                        <button className="btn btn-secondary tab-button" onClick={this.props.filterPast}>Past trips </button>
                    </div>
                    <div className="tab-button">
                        <button className="btn btn-secondary tab-button" onClick={this.props.filterUpcoming}>Upcoming trips</button>
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
    return bindActionCreators({getTrips, filterPast,filterUpcoming},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ListWithTripsItems);



