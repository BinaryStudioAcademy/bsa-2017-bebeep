import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteVehicle } from '../../actions';

class VehicleItem extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick(e) {
        e.preventDefault();

        const carId = e.target.getAttribute('data-id');
        this.props.deleteVehicle(carId);
    }

    render() {
        const vehicle = this.props.vehicle;

        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to={ 'vehicles/edit/' + vehicle.id }>
                            { vehicle.brand + " " + vehicle.model}
                        </Link>
                    </div>
                    <div className="col-md-6">
                        <div className="pull-right">
                            <button type="button" className="btn btn-danger" data-id={vehicle.id} onClick={this.onClick.bind(this)}>Delete</button>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }
}

VehicleItem.propTypes = {
    vehicle: PropTypes.object,
    deleteVehicle: PropTypes.func
};

export default connect(
    (state) => {
        return { vehicleState: state.vehicle };
    },
    (dispatch) => bindActionCreators({ deleteVehicle }, dispatch)

)(VehicleItem);