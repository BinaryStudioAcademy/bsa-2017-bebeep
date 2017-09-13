import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { localize } from 'react-localize-redux';

import VehicleItem from '../Elements/VehicleItem';
import { getVehicles } from 'features/car/actions';

class VehiclesList extends React.Component {

    constructor(props) {
        super(props);
        this.props.getVehicles();
    }

    render() {
        const { translate, vehicles } = this.props;

        const vehiclesView = (vehicles.length > 0)
            ? vehicles.map(vehicle => {
                return (
                    <VehicleItem key={ vehicle.id } vehicle={ vehicle } />
                );
            })
            : null;

        return (
            <table className="table table-list-details">
                <thead>
                    <tr>
                        <th>{ translate('vehicles_list.options.brand') }</th>
                        <th>{ translate('vehicles_list.options.model') }</th>
                        <th>{ translate('vehicles_list.options.year') }</th>
                        <th>{ translate('vehicles_list.options.body') }</th>
                        <th>{ translate('vehicles_list.options.color') }</th>
                        <th>{ translate('vehicles_list.options.seats') }</th>
                        <th>{ translate('vehicles_list.options.photo') }</th>
                        <th className="table-details__cell-for-action"></th>
                        <th className="table-details__cell-for-action"></th>
                    </tr>
                </thead>
                <tbody>
                    { vehiclesView }
                    { vehiclesView }
                </tbody>
            </table>
        );
    }
}

VehiclesList.propTypes = {
    getVehicles: PropTypes.func,
};

const VehiclesListConnected = connect(
    state => ({
        vehicles: state.vehicle.vehicles,
    }),
    dispatch => bindActionCreators({ getVehicles }, dispatch)

)(VehiclesList);

export default localize(VehiclesListConnected, 'locale');
