import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { deleteVehicle } from 'features/car/actions';
import { getVehiclePhoto } from 'app/services/PhotoService';

class VehicleItem extends React.Component {

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        e.preventDefault();

        const carId = e.target.getAttribute('data-id');
        this.props.deleteVehicle(carId);
    }

    render() {
        const vehicle = this.props.vehicle;

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
                    <Link to={ 'vehicles/edit/' + vehicle.id }
                        className="btn btn--with-icon btn-success"
                    >
                        <i className="fa fa-pencil" aria-hidden="true" />
                    </Link>
                </td>
                <td className="table-list-details__cell-for-action">
                    <button type="button"
                        role="button"
                        className="btn btn--with-icon btn-danger"
                        data-id={vehicle.id}
                        onClick={this.onClick}
                    >
                        <i className="fa fa-trash-o" aria-hidden="true" />
                    </button>
                </td>
            </tr>
        );
    }
}

VehicleItem.propTypes = {
    vehicle: PropTypes.object,
    deleteVehicle: PropTypes.func
};

export default connect(
    state => ({
        vehicleState: state.vehicle,
    }),
    dispatch => bindActionCreators({ deleteVehicle }, dispatch)
)(VehicleItem);
