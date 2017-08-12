import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { showModal } from "../actions";
import Map from './map';
import './css/TripsListItem.scss';

class TripsListItem extends Component {
    constructor(props){
        super(props);
        this.showModal = this.showModal.bind(this);
    }

    showModal(){
        this.props.showModal(this.props.tripData)
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
                    {/*Small map*/}
                    <div className="list-map" onClick={this.showModal} >
                        <Map key={new Date()} from={data.from} to={data.to} />
                    </div>
                    {edit}
                </li>
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
    return bindActionCreators({showModal}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(TripsListItem);
