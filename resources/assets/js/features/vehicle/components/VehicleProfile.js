import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { getVehicle } from '../actions';

class VehicleProfile extends Component {

    constructor(props) {
        super(props);

        this.props.getVehicle(this.props.id);
    }

    render() {
        const { vehicle } = this.props.vehicleState;

        return (
            <div className="card">
                <div className="card-header">
                    <Link title="Click here to edit this vehicle" to={ '/mycars/vehicle/' + vehicle.id + '/edit' }>{ vehicle.id } { vehicle.body } { vehicle.brand }</Link></div>
                <div className="card-block">
                    <p className="card-text">Year: { vehicle.year }</p>
                    <p className="card-text">Seats: { vehicle.seats }</p>
                </div>
            </div>
        );
    }
}

VehicleProfile.propTypes = {
    getVehicle: PropTypes.func,
};

const VehicleProfileConnected = connect(
    (state) => {
        return { vehicleState: state.vehicle };
    },
    (dispatch) => bindActionCreators({ getVehicle }, dispatch)

)(VehicleProfile);

export default VehicleProfileConnected;
