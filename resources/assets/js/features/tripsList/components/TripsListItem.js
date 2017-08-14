import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import MapDirection from './MapDirection';
import './css/TripsListItem.scss';

class TripsListItem extends Component {
    constructor(props){
        super(props);
        this.showModal = this.showModal.bind(this);
    }

    showModal(event){
        this.props.openModal(event,this.props.tripData);
    }

    render() {
        let data = this.props.tripData;
        let edit = null;
        if( new Date(data.start_at)>new Date() ) {
            edit = (
                <div className="list-actions">
                    <Link to={ 'trip/edit/'+ data.id }>
                        <button className="btn btn-default">Edit</button>
                    </Link>

                </div>
            );
        }

        return (
                <li className="list-group-item" onClick={this.showModal}>
                    <div className="list-data">
                        Brand: {data.brand} <br/>
                        Model: {data.model}<br/>
                        Start: {data.start_at}<br/>
                        End: {data.end_at}<br/>
                    </div>
                    {/*Small map*/}
                    <div className="list-map"  >
                        <MapDirection  from={data.from} to={data.to} />
                    </div>
                    {edit}
                </li>
        );
    }
}

function mapStateToProps (state) {
    return {
        tripsState: state.tripsList
    }
}


export default connect(mapStateToProps)(TripsListItem);
