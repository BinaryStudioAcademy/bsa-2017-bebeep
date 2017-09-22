import React from 'react';
import PropTypes from 'prop-types';

import { getVehiclePhoto } from 'app/services/PhotoService';

class VehicleItem extends React.Component {

    render() {
        const { vehicle } = this.props;

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
            </tr>
        );
    }
}

VehicleItem.propTypes = {
    vehicle: PropTypes.object.isRequired,
};

export default VehicleItem;
