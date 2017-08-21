import React from 'react';
import Select from 'react-select';
import {VehicleService} from '../../services/VehicleService';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export default class CreateVehicleContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            brand: {
                id_car_mark: null,
                name: null
            },
            model: {
                id_car_model: null,
                id_car_mark: null,
                name: null,
                disabled: true
            }
        };

        this.getBrandOptions = VehicleService.getBrandOptions;
        this.getModelOptions = VehicleService.getModelOptions;
        this.handleBrandChange = this.handleBrandChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
    }

    handleBrandChange(data) {
        console.log(data);

        this.setState({
            brand: {
                id_car_mark: (data !== null) ? data.id_car_mark : null,
                name: (data !== null) ? data.name : null
            },
            model: {
                id_car_mark: (data !== null) ? data.id_car_mark : null,
                disabled: (data !== null) ? false : true
            }
        });
    }

    handleModelChange(data) {
        console.log(data);

        this.setState({
            model: {
                id_car_model: (data !== null) ? data.id_car_model : null,
                name: (data !== null) ? data.name : null
            }
        });
    }

    render() {
        return (
            <form role="form" className="card vehicle-form" action="/api/v1/car" method="POST">
                <div className="card-header">
                    Enter vehicle details
                </div>
                <div className="card-block">
                    <div className="form-group row ">
                        <label className="form-control-label text-muted col-sm-4" htmlFor="brand">Car Brand</label>
                        <Select.Async
                            name="brand"
                            placeholder="Select Car Brand"
                            value={this.state.brand.name}
                            valueKey="name"
                            labelKey="name"
                            className="col-sm-8"
                            loadOptions={ this.getBrandOptions }
                            onChange={this.handleBrandChange}
                            clearable={true}
                        />
                    </div>

                    <div className="form-group row ">
                        <label className="form-control-label text-muted col-sm-4" htmlFor="model">Car Model</label>
                        <Select.Async
                            name="model"
                            placeholder="Select Car Model"
                            value={this.state.model.name}
                            valueKey="name"
                            labelKey="name"
                            className="col-sm-8"
                            disabled={this.state.model.disabled}
                            loadOptions={ this.getModelOptions }
                            onChange={this.handleModelChange}
                            clearable={true}
                        />
                    </div>

                    <div className="form-group row ">
                        <label className="form-control-label text-muted col-sm-4" htmlFor="color">Color</label>
                    </div>

                    <div className="form-group row ">
                        <label className="form-control-label text-muted col-sm-4" htmlFor="year">Year</label>
                    </div>

                    <div className="form-group row ">
                        <label className="form-control-label text-muted col-sm-4" htmlFor="body">Body</label>
                    </div>

                    <div className="form-group row ">
                        <label className="form-control-label text-muted col-sm-4" htmlFor="seats">Seats</label>
                    </div>
                </div>

                <div className="card-footer">
                    <div className="text-center">
                        <button className="btn btn-primary">
                            Create
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}