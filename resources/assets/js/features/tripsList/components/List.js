import React, { Component } from 'react';
import TripsListItem from './TripsListItem';
import MapModal from './MapModal';

class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen:false,
            trip: {from:['49.82','24.03'], to:['49.51','25.52']}
        };
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    openModal(event,data){
        this.setState({
            isOpen: true,
            trip: data
        });
    }

    closeModal(event){
        this.setState({
            isOpen: false
        });
    }

    render(){
        let trips = this.props.allTrips;
        let tripsList = "No trips";
        tripsList = trips.map(function (tripData, index) {
            return (
                    <TripsListItem key={index}  tripData={tripData} openModal={this.openModal}/>
            );
        },this);

        return(
            <div>
                <ul className="list-group">
                    {tripsList}
                </ul>
                <MapModal isOpen={this.state.isOpen}
                          onClosed={this.closeModal}
                          modalData={this.state.trip}
                />
            </div>
        )
    }
}
export default List;