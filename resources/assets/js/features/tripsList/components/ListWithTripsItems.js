import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { fetchPast,fetchUpcoming } from "../actions";
import List from './List';
import './css/ListWithTripsItems.scss';

class ListWithTripsItems extends  Component{

    constructor(props) {
        super(props);
        this.props.fetchPast();
    }

    render() {
         let trips= this.props.tripsState.trips;
         let modalData = this.props.tripsState.modalData ;

        return (
            <div>
                <ul className="pagination d-flex justify-content-center">
                    <li className="page-item"><a className="page-link" href="#" onClick={this.props.fetchPast}>Past trips</a></li>
                    <li className="page-item"><a className="page-link" href="#" onClick={this.props.fetchUpcoming}>Upcoming trips</a></li>
                </ul>

                <List allTrips={trips} modalData ={modalData}/>
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
    return bindActionCreators({fetchPast,fetchUpcoming},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(ListWithTripsItems);



