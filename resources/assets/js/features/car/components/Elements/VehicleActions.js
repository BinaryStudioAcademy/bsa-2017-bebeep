import React from 'react';
import PropTypes from 'prop-types';

import { EditButton, DeleteButton } from 'app/components/Buttons';

class VehicleActions extends React.Component {

    render() {
        const { vehicle, onDeleteVehicle } = this.props;

        return (
            <tr>
                <td className="table-list-details__cell-for-action">
                    <EditButton pathTo={'vehicles/edit/' + vehicle.id} />
                </td>
                <td className="table-list-details__cell-for-action">
                    <DeleteButton onClick={() => onDeleteVehicle(vehicle.id)} />
                </td>
            </tr>
        );
    }
}

VehicleActions.propTypes = {
    vehicle: PropTypes.object.isRequired,
    onDeleteVehicle: PropTypes.func.isRequired,
};

export default VehicleActions;
