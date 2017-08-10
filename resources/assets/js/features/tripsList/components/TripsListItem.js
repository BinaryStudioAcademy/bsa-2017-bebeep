import React, { Component } from 'react';

class TripsListItem extends Component {

    render() {
        let data = this.props.tripData;
        return (
            <li className="list-group-item">
                {data.model}
            </li>
        );
    }
}

export default TripsListItem;
