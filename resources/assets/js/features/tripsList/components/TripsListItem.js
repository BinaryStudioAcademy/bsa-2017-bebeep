import React, { Component } from 'react';
import { Link } from 'react-router';

class TripsListItem extends Component {

    render() {
        let data = this.props.tripData;
        let edit = null;
        if( new Date(data.start_at)>new Date() ) {
            edit = (<button className="btn btn-default">Edit</button>);
        }
        return (
            <div>
            <li className="list-group-item">
                Brand: {data.brand} <br/>
                Model: {data.model}<br/>
                Start: {data.start_at}<br/>
                End: {data.end_at}<br/>
            </li>
                <Link to={ 'trips/' + data.id+'/edit' }>{edit} </Link>
            </div>
        );
    }
}

export default TripsListItem;
