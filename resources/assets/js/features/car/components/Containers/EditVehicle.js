import React from 'react';
import { browserHistory } from 'react-router';

import VehicleForm from '../Forms/VehicleForm';

import { VehicleValidate } from 'app/services/VehicleService';
import { securedRequest } from 'app/services/RequestService';
import { VehicleService } from 'features/car/services/VehicleService';
import EditVehicleService from 'features/car/services/EditVehicleService';

export default class EditVehicle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            notFoundVehicle: false,
            id: null,
            brand: {
                id_car_mark: null,
                name: null
            },
            model: {
                id_car_model: null,
                id_car_mark: null,
                name: null,
                disabled: true
            },
            color: {
                id: null,
                color: null
            },
            body: {
                id: null,
                body: null
            },
            seats: null,
            year: new Date().getFullYear()
        };
    }

    componentDidMount() {
        EditVehicleService.getVehicle(this.props.id)
            .then(response => {
                this.setState({
                    id: response.id,
                    brand: {
                        name: response.brand
                    },
                    model: {
                        name: response.model,
                        disabled: false
                    },
                    color: {
                        color: response.color
                    },
                    body: {
                        body: response.body
                    },
                    seats: response.seats,
                    year: response.year
                });
            }).catch(error => {
                this.setState({
                    notFoundVehicle: true,
                });
            });
    }

    handleBrandChange(data) {
        this.setState({
            brand: {
                id_car_mark: (data) ? data.id_car_mark : null,
                name: (data) ? data.name : null
            },
            model: {
                id_car_mark: (data) ? data.id_car_mark : null,
                disabled: (data) ? false : true
            }
        });
    }

    handleModelChange(data) {
        this.setState({
            model: {
                id_car_model: (data) ? data.id_car_model : null,
                name: (data) ? data.name : null
            }
        });
    }

    handleColorChange(data) {
        this.setState({
            color: {
                id: (data) ? data.id : null,
                color: (data) ? data.color : null
            }
        });
    }

    handleBodyChange(data) {
        this.setState({
            body: {
                id: (data) ? data.id : null,
                body: (data) ? data.body : null
            }
        });
    }

    handleYearChange(data) {
        this.setState({
            year: data
        });
    }

    handleSeatsChange(data) {
        this.setState({
            seats: data
        });
    }

    getModelLoadOptions = () => {
        return VehicleService.getModelOptions(this.state.brand.id_car_mark);
    };

    onSubmit(e) {
        e.preventDefault();

        let data = {
            brand: (e.target['brand']) ? e.target['brand'].value : '',
            model: (e.target['model']) ? e.target['model'].value : '',
            color: (e.target['color']) ? e.target['color'].value : '',
            body: (e.target['body']) ? e.target['body'].value : '',
            year: (e.target['year']) ? e.target['year'].value : '',
            seats: (e.target['seats']) ? e.target['seats'].value : '',
            photo: null
        };

        const validate = VehicleValidate(data);

        if(!validate.valid) {
            this.setState({
                errors: validate.errors
            });
        } else {
            EditVehicleService.sendUpdatedVehicle(this.props.id, data);
        }
    }

    render() {
        if (this.state.notFoundVehicle) {
            return (
                <div className="alert alert-danger" role="alert">
                    You can't edit this vehicle info...
                </div>
            );
        }

        if (!this.state.id) {
            return (
                <div className="alert">
                    Loading...
                </div>
            );
        }

        return (
            <VehicleForm
                errors={ this.state.errors }
                brand={ this.state.brand }
                model={ this.state.model }
                color={ this.state.color }
                body={ this.state.body }
                year={ this.state.year }
                seats={ this.state.seats }
                getBrandOptions={ VehicleService.getBrandOptions }
                getModelLoadOptions={ this.getModelLoadOptions }
                getColorOptions={ VehicleService.getColorOptions }
                getBodyOptions={ VehicleService.getBodyOptions }
                handleBrandChange={ this.handleBrandChange.bind(this) }
                handleModelChange={ this.handleModelChange.bind(this) }
                handleColorChange={ this.handleColorChange.bind(this) }
                handleBodyChange={ this.handleBodyChange.bind(this) }
                handleYearChange={ this.handleYearChange.bind(this) }
                handleSeatsChange={ this.handleSeatsChange.bind(this) }
                onSubmit={ this.onSubmit.bind(this) }
            />
        );
    }
}
