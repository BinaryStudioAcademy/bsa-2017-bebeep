import React, { Component } from 'react';
import { Link } from 'react-router';
import Map from './map';
import Modal from './modal';
import './css/TripsListItem.scss';

class TripsListItem extends Component {
    constructor(props){
        super(props);
        this.state = { isModalOpen: false };
    }

    openModal() {
        this.setState({ isModalOpen: true })
    }

    closeModal() {
        this.setState({ isModalOpen: false })
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
                    <div className="list-map" onClick={() => this.openModal()} >
                        <Map from={data.from} to={data.to} />
                    </div>

                    {edit}
                </li>
                <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
                    <div className="big-map">
                        <Map from={data.from} to={data.to} />
                    </div>
                    <div className="row">
                        <div className="col-md-10" />
                        <div className="col-md-1">
                            <button className="btn btn-default" onClick={() => this.closeModal()}>Close</button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default TripsListItem;
