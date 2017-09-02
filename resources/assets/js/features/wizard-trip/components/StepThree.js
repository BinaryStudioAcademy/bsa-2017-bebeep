import React from 'react';
import {Input, InputAutocomplete} from 'app/components/Controls/index.js';
import { Button } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addCar} from '../actions';
import {getTranslate} from 'react-localize-redux';
import { VehicleValidate, VehicleData } from 'app/services/VehicleService';

class StepThree extends React.Component {
    constructor() {
        super();
        this.state = {
            brand: {
                id: null,
                value: ''
            },
            model: {
                id: null,
                value: ''
            },
            brands: [],
            models: [],
            errors: {}
        };

        this.onBrandChange = this.onBrandChange.bind(this);
        this.onModelChange = this.onModelChange.bind(this);
        this.onNext = this.onNext.bind(this);

        this.onBrandSelected = this.onBrandSelected.bind(this);
        this.onModelSelected = this.onModelSelected.bind(this);
        this.transformBrand = this.transformBrand.bind(this);
        this.transformModel = this.transformModel.bind(this);
    }

    componentWillMount() {
        this.setState({
            brand: {
                value: this.props.tripWizard.brand
            },
            model: {
                value: this.props.tripWizard.model
            }
        });
    }

    onBrandChange(e) {
        const brand = e.target.value,
            {brands} = this.state;

        this.setState({brand: { value: e.target.value }});

        VehicleData
            .fetchBrand(brand)
            .then((response) => this.setState({brands: _.unionBy(brands, response.data.data, 'id')}));
    }

    onModelChange(e) {
        const model = e.target.value,
            { brand, models } = this.state;

        this.setState({model: { value: e.target.value}});

        VehicleData
            .fetchModel(model, brand.id)
            .then((response) => this.setState({models: _.unionBy(models, response.data.data, 'id')}));
    }

    onBrandSelected (value, item) {
        this.setState({
            brand: {
                id: this.transformBrand(item).id,
                value: this.transformBrand(item).label
            }
        });
    }

    onModelSelected (value, item) {
        this.setState({
            model: {
                id: this.transformModel(item).id,
                value: this.transformModel(item).label
            }
        });
    }

    transformBrand(item) {
        return {
            id: item.id,
            label: item.name
        };
    }

    transformModel(item) {
        return {
            id: item.id,
            label: item.name
        };
    }

    onNext() {
        const {brand, model} = this.state,
            data = {
                brand: brand.value,
                model: model.value
            },
            result = VehicleValidate(data);

        if (result.valid) {
            this.props.addCar(data);
        } else {
            this.setState({errors: result.errors});
        }
    }

    render() {
        const {brand, model, brands, models, errors} = this.state,
            {translate} = this.props;

        return (
            <div>
                <div className="wizard-form__input">
                    <InputAutocomplete
                        id="brand"
                        ico="fa-circle-o"
                        value={brand.value}
                        onChange={this.onBrandChange}
                        error={errors.brand}

                        onFocus={this.onBrandChange}
                        onSelected={this.onBrandSelected}
                        transformer={this.transformBrand}
                        items={brands}
                    >{translate('wizard-trip.car_mark')}</InputAutocomplete>
                </div>
                <div className="wizard-form__input">
                    <InputAutocomplete
                        id="model"
                        value={model.value}
                        onChange={this.onModelChange}
                        error={errors.model}

                        onFocus={this.onModelChange}
                        onSelected={this.onModelSelected}
                        transformer={this.transformModel}
                        items={models}
                    >{translate('wizard-trip.car_model')}</InputAutocomplete>
                </div>

                <Button
                    className="wizard-form__btn btn btn-warning btn-lg"
                    color="warning"
                    size="lg"
                    role="button"
                    onClick={this.onNext}
                >
                    {translate('wizard-trip.create')}
                </Button>
            </div>
        );
    }
}

export default connect(
    state => ({
        tripWizard: state.tripWizard.pendingTrip,
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({addCar}, dispatch)
)(StepThree);
