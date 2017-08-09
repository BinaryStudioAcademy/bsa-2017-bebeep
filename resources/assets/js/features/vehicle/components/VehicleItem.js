import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class VehicleItem extends Component {

    render() {
        const vehicle = this.props.vehicle;

        return (
            <li className="list-group-item">
                <Link to={ 'vehicles/' + vehicle.id }>{ vehicle.name }</Link>
            </li>
        );
    }
}

VehicleItem.propTypes = {
    vehicle: PropTypes.object
};

export default VehicleItem;
