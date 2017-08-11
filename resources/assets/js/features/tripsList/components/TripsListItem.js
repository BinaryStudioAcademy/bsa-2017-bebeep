import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { showModal,hideModal } from "../actions";
import Modal from './modal';
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
        let modalData = this.props.tripData;
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
                        <Map from={data.from} to={data.to} />
                    </div>

                    {edit}
                </li>

                <Modal isOpen={this.props.tripsState.isOpen}  onClose={this.props.hideModal} >
                    <div className="big-map">
                        <Map from={modalData.from} to={modalData.to} />
                    </div>
                    <div className="row">
                        <div className="col-md-10" />
                        <div className="col-md-1">
                            <button className="btn btn-secondary" onClick={this.props.hideModal}>Close</button>
                        </div>
                    </div>
                </Modal>

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
    return bindActionCreators({showModal,hideModal}, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(TripsListItem);
