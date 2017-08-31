import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import VehicleItem from '../Elements/VehicleItem';
import { getVehicles } from 'features/car/actions';

class VehiclesList extends React.Component {
    constructor(props) {
        super(props);
        this.props.getVehicles();
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

export default connect(
    (state) => {
        return { vehicleState: state.vehicle };
    },
    (dispatch) => bindActionCreators({ getVehicles }, dispatch)

)(VehiclesList);
