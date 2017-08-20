import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getVehicles } from '../actions';

import VehicleItem from './VehicleItem';

class VehiclesList extends React.Component {

    constructor(props) {
        super(props);

        this.props.getVehicles();
    }

    shouldComponentUpdate(nextProps, nextState) {
        const oldState = this.props.vehicleState,
            newState = nextProps.vehicleState;

        return newState.vehicles.length !== oldState.vehicles.length;
    }

    render() {
        const { vehicles } = this.props.vehicleState;

        const vehiclesView = (vehicles.length > 0)
          ? vehicles.map(vehicle => {
              return (
                <VehicleItem key={ vehicle.id } vehicle={ vehicle } />
              );
            })
          : null;

        return (
            <ul className="vehicles-list list-group">
                { vehiclesView }
            </ul>
        );
    }
}

VehiclesList.propTypes = {
    getVehicles: PropTypes.func,
};

const VehiclesListConnected = connect(
    (state) => {
        return { vehicleState: state.vehicle };
    },
    (dispatch) => bindActionCreators({ getVehicles }, dispatch)

)(VehiclesList);

export default VehiclesListConnected;
