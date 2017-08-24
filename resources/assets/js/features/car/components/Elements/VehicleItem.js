import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { securedRequest } from 'app/services/RequestService';

class VehicleItem extends React.Component {

    onClick(e) {
        e.preventDefault();

        const carId = e.target.getAttribute('data-id');

        securedRequest.delete('/api/v1/car/' + carId).then((response) => {
            console.log(response.data);
        });

        console.log(carId);
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
    vehicle: PropTypes.object
};

export default VehicleItem;