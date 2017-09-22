import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { localize } from 'react-localize-redux';

import VehicleItem from '../Elements/VehicleItem';
import { getVehicles, deleteVehicle } from 'features/car/actions';

class VehiclesList extends React.Component {

    constructor(props) {
        super(props);

        this.props.getVehicles();
        this.onDeleteVehicle = this.onDeleteVehicle.bind(this);
    }

    onDeleteVehicle(id) {
        this.props.deleteVehicle(id);
    }

    render() {
        const { translate, vehicles } = this.props;

        const vehiclesView = (vehicles.length > 0)
            ? vehicles.map(vehicle => {
                return (
                    <VehicleItem key={ vehicle.id } vehicle={ vehicle }
                        onDeleteVehicle={this.onDeleteVehicle} />
                );
            })
            : null;

        return (
            <div className="table-responsive">
                <table className="table table-list-details">
                    <thead className="with-background-teal">
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
                    </tbody>
                </table>
            </div>
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
    dispatch => bindActionCreators({ getVehicles, deleteVehicle }, dispatch)

)(VehiclesList);

export default localize(VehiclesListConnected, 'locale');
