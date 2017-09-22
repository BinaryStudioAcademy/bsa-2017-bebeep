import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { localize } from 'react-localize-redux';

import { VehicleItem, VehicleActions } from '../Elements';
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

    renderVehiclesItems() {
        const { vehicles } = this.props;

        if (vehicles.length <= 0) {
            return null;
        }

        return vehicles.map(vehicle =>
            <VehicleItem key={ vehicle.id } vehicle={ vehicle } />
        );
    }

    renderVehiclesActions() {
        const { vehicles } = this.props;

        if (vehicles.length <= 0) {
            return null;
        }

        return vehicles.map(vehicle =>
            <VehicleActions key={ vehicle.id }
                vehicle={ vehicle }
                onDeleteVehicle={this.onDeleteVehicle} />
        );
    }

    render() {
        const { translate, vehicles } = this.props;

        return (
            <div className="d-flex justify-content-between">
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
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderVehiclesItems()}
                        </tbody>
                    </table>
                </div>
                <div>
                    <table className="table table-list-details table-list-details--actions">
                        <thead className="with-background-teal">
                            <tr>
                                <th className="table-details__cell-for-action">&nbsp;</th>
                                <th className="table-details__cell-for-action">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderVehiclesActions()}
                        </tbody>
                    </table>
                </div>
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
