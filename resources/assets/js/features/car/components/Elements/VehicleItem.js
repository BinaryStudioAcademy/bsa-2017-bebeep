import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTranslate } from "react-localize-redux";

import { deleteVehicle } from 'features/car/actions';

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
        const { translate, vehicle } = this.props;

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
                            <button type="button"
                                className="btn hover btn-danger"
                                data-id={vehicle.id}
                                onClick={this.onClick.bind(this)}
                            >{translate('vehicles.btn_delete')}</button>
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
    state => ({
        vehicleState: state.vehicle,
        translate: getTranslate(state.locale),
    }),
    (dispatch) => bindActionCreators({ deleteVehicle }, dispatch)

)(VehicleItem);
