import React, { Component } from 'react';
import TripsListItem from './TripsListItem';

class List extends Component{
    render(){
        let trips = this.props.allTrips;
        let tripsList = "No trips";
        tripsList = trips.map(function (tripData, index) {
            return (
                <TripsListItem  key={index} tripData={tripData}/>
            );
        });

        return(
            <ul className="list-group">
                {tripsList}
            </ul>
        )
    }
}
export default List;