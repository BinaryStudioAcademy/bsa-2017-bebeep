import React from 'react';
import PropTypes from 'prop-types';

import { EditButton, DeleteButton } from 'app/components/Buttons';
import { getVehiclePhoto } from 'app/services/PhotoService';

class VehicleItem extends React.Component {

    render() {
        const { vehicle, onDeleteVehicle } = this.props;

        return (
            <tr>
                <td>{vehicle.brand}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.year}</td>
                <td>{vehicle.body}</td>
                <td>{vehicle.color}</td>
                <td>{vehicle.seats}</td>
                <td>
                    <div className="table-list-details__image">
                        { getVehiclePhoto(vehicle) }
                    </div>
                </td>
                <td className="table-list-details__cell-for-action">
                    <EditButton pathTo={ 'vehicles/edit/' + vehicle.id } />
                </td>
                <td className="table-list-details__cell-for-action">
                    <DeleteButton onClick={() => onDeleteVehicle(vehicle.id)} />
                </td>
            </tr>
        );
    }
}

VehicleItem.propTypes = {
    vehicle: PropTypes.object.isRequired,
    onDeleteVehicle: PropTypes.func.isRequired,
};

export default VehicleItem;
