import React, { Component } from 'react';

class TripsListItem extends Component {

    render() {
        let data = this.props.tripData;
        return (
            <li className="list-group-item">
                Brand: {data.brand} <br/>
                Model: {data.model}<br/>
                Start: {data.start_at}<br/>
                End: {data.end_at}<br/>

            </li>
        );
    }
}

export default TripsListItem;
