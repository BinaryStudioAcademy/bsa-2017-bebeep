import React, { Component } from 'react';

class TripsListItem extends Component {

    render() {
        let data = this.props.tripData;
        return (
            <div className="panel">
                <div className="panel-body">
                    {data.model}
                </div>
            </div>
        );
    }
}

export default TripsListItem;
