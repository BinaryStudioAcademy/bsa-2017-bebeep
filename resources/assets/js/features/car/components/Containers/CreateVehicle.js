import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VehicleForm from '../Forms/VehicleForm';
import { VehicleValidate } from 'app/services/VehicleService';
import { VehicleService } from 'features/car/services/VehicleService';
import { getVehiclesData, getBrandModelsData, resetModelsData, resetVehicleFormItems } from 'features/car/actions';

class CreateVehicle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            brand: {
                id: null,
                name: null
            },
            model: {
                id: null,
                brand_id: null,
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

    componentWillMount() {
        this.props.getVehiclesData();
    }

    handleBrandChange(data) {
        this.setState({
            brand: {
                id: (data) ? data.id : null,
                name: (data) ? data.name : null
            },
            model: {
                brand_id: (data) ? data.id : null,
                disabled: (!data)
            }
        });

        if(data) {
            this.props.getBrandModelsData(data.id);
        } else {
            this.props.resetModelsData();
        }
    }

    handleModelChange(data) {
        this.setState({
            model: {
                id: (data) ? data.id : null,
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

    onSubmit(e) {
        e.preventDefault();

        let data = {
            brand: (e.target['brand']) ? e.target['brand'].value : '',
            model: (e.target['model']) ? e.target['model'].value : '',
            color: (e.target['color']) ? e.target['color'].value : '',
            body: (e.target['body']) ? e.target['body'].value : '',
            year: (e.target['year']) ? e.target['year'].value : '',
            seats: (e.target['seats']) ? e.target['seats'].value : '',
            car_brand_id: this.state.brand.id,
            photo: null
        };

        const validate = VehicleValidate(data);

        if(!validate.valid) {
            this.setState({
                errors: validate.errors
            });
        } else {
            VehicleService.saveVehicleData(data);
            this.props.resetVehicleFormItems();
        }
    }

    render() {
        const {brands, models, colors, body} = this.props.vehicle.form_items;

        return (
            <VehicleForm
                errors={ this.state.errors }
                brand={ this.state.brand }
                model={ this.state.model }
                color={ this.state.color }
                body={ this.state.body }
                year={ this.state.year }
                seats={ this.state.seats }
                getBrandOptions={ brands }
                getModelLoadOptions={ models }
                getColorOptions={ colors }
                getBodyOptions={ body }
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

export default connect(
    state => ({
        vehicle: state.vehicle,
    }),
    (dispatch) => bindActionCreators({
        getVehiclesData,
        getBrandModelsData,
        resetModelsData,
        resetVehicleFormItems
    }, dispatch)
)(CreateVehicle);