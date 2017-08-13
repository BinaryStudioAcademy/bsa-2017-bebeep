import React, { Component } from 'react';

import TripsListItem from './TripsListItem';

class Items extends Component{
    constructor(props){
        super(props);
    }

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
export default Items;