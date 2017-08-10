import React, { Component } from 'react';
import { Link } from 'react-router';
import Map from './map';
import './css/TripsListItem.scss';

class TripsListItem extends Component {
    constructor(props){
        super(props);
        this.state = { isOpen: false };
    }

    render() {
        let data = this.props.tripData;
        let edit = null;
        if( new Date(data.start_at)>new Date() ) {
            edit = (
                <div className="list-actions">
                    <Link to={ 'trips/' + data.id+'/edit' }>
                        <button className="btn btn-default">Edit</button>
                    </Link>
                </div>
            );
        }

        return (
            <div>
                <li className="list-group-item">
                    <div className="list-data">
                        Brand: {data.brand} <br/>
                        Model: {data.model}<br/>
                        Start: {data.start_at}<br/>
                        End: {data.end_at}<br/>
                    </div>
                    <div className="list-map" onClick={this.toggleModal} >
                        <Map from={data.from} to={data.to} />
                    </div>
                    {edit}
                </li>
            </div>
        );
    }
}

export default TripsListItem;
