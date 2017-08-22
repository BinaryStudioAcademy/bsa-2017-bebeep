import React from 'react';
import Select from 'react-select';
import NumericInput from 'react-numeric-input';
import {VehicleService} from '../../services/VehicleService';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { vehicleCreateSuccess } from '../../actions';
import { securedRequest } from 'app/services/RequestService';

class CreateVehicleContainer extends React.Component {
    constructor(props) {
        super(props);
        this.currentYear = (new Date()).getFullYear();

        this.state = {
            errors: {},
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
            year: this.currentYear
        };

        this.getBrandOptions = VehicleService.getBrandOptions;
        this.getModelOptions = VehicleService.getModelOptions;
        this.getColorOptions = VehicleService.getColorOptions;
        this.getBodyOptions = VehicleService.getBodyOptions;
        this.handleBrandChange = this.handleBrandChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleSeatsChange = this.handleSeatsChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleBrandChange(data) {
        console.log(data);

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
        console.log(data);

        this.setState({
            model: {
                id_car_model: (data) ? data.id_car_model : null,
                name: (data) ? data.name : null
            }
        });
    }

    handleColorChange(data) {
        console.log(data);

        this.setState({
            color: {
                id: (data) ? data.id : null,
                color: (data) ? data.color : null
            }
        });
    }

    handleBodyChange(data) {
        console.log(data);

        this.setState({
            body: {
                id: (data) ? data.id : null,
                body: (data) ? data.body : null
            }
        });
    }

    handleYearChange(data) {
        console.log(data);

        this.setState({
            year: data
        });
    }

    handleSeatsChange(data) {
        console.log(data);

        this.setState({
            seats: data
        });
    }

    getModelLoadOptions() {
        return this.getModelOptions(this.state.brand.id_car_mark);
    }

    onSubmit(e) {
        e.preventDefault();

        let data = {
            brand: e.target['brand'].value,
            model: e.target['model'].value,
            color: e.target['color'].value,
            body: e.target['body'].value,
            year: e.target['year'].value,
            seats: e.target['seats'].value,
            photo: null
        };

        securedRequest.post('/api/v1/car', data).then((response) => {
            this.props.vehicleCreateSuccess(response.data);
            this.setState({errors: {}});

            /*if (response.status === 200) {
                browserHistory.push('/vehicles');
            }*/
        }).catch((error) => {
            this.setState({
                errors: error.response.data
            })
        });

        console.log(this.state.errors);
    }

    render() {
        return (
            <form role="form" className="card vehicle-form" action="/api/v1/car" method="POST" onSubmit={ this.onSubmit }>
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
                            placeholder="Please Type Car-model..."
                            value={this.state.model.name}
                            valueKey="name"
                            labelKey="name"
                            className="col-sm-8"
                            disabled={this.state.model.disabled}
                            loadOptions={ this.getModelLoadOptions.bind(this) }
                            onChange={this.handleModelChange}
                            cache={false}
                            autoload={false}
                            clearable={true}
                        />
                    </div>

                    <div className="form-group row ">
                        <label className="form-control-label text-muted col-sm-4" htmlFor="color">Color</label>
                        <Select.Async
                            name="color"
                            placeholder="Select Car Color"
                            value={this.state.color.color}
                            valueKey="color"
                            labelKey="color"
                            className="col-sm-8"
                            loadOptions={ this.getColorOptions }
                            onChange={this.handleColorChange}
                            clerable={true}
                        />
                    </div>

                    <div className="form-group row ">
                        <label className="form-control-label text-muted col-sm-4" htmlFor="body">Body</label>
                        <Select.Async
                            name="body"
                            placeholder="Select Car Body Type"
                            value={this.state.body.body}
                            valueKey="body"
                            labelKey="body"
                            className="col-sm-8"
                            loadOptions={ this.getBodyOptions }
                            onChange={this.handleBodyChange}
                            clerable={true}
                        />
                    </div>

                    <div className="form-group row ">
                        <label className="form-control-label text-muted col-sm-4" htmlFor="year">Year</label>
                        <div className="col-sm-8">
                            <NumericInput className="form-control"
                                          name="year"
                                          placeholder="Select Car Year"
                                          min={1980}
                                          max={this.currentYear}
                                          value={this.state.year}
                                          onChange={this.handleYearChange}
                            />
                        </div>
                    </div>

                    <div className="form-group row ">
                        <label className="form-control-label text-muted col-sm-4" htmlFor="seats">Seats</label>
                        <div className="col-sm-8">
                            <NumericInput className="form-control"
                                          name="seats"
                                          placeholder="Select Seats Count"
                                          min={1}
                                          max={8}
                                          value={this.state.seats}
                                          onChange={this.handleSeatsChange}
                            />
                        </div>
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

export default connect(
    null,
    (dispatch) => bindActionCreators({ vehicleCreateSuccess }, dispatch)
)(CreateVehicleContainer);