import React from 'react';
import {Input} from 'app/components/Controls/index.js';
import { Button } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addCar} from '../actions';
import {getTranslate} from 'react-localize-redux';
import { VehicleValidate } from 'app/services/VehicleService';

class StepThree extends React.Component {
    constructor() {
        super();
        this.state = {
            brand: '',
            model: '',
            errors: {}
        };

        this.onMarkChange = this.onMarkChange.bind(this);
        this.onModelChange = this.onModelChange.bind(this);
        this.onNext = this.onNext.bind(this);
    }

    componentWillMount() {
        this.setState({
            brand: this.props.tripWizard.brand,
            model: this.props.tripWizard.model
        });
    }

    onMarkChange(e) {
        this.setState({brand: e.target.value});
    }

    onModelChange(e) {
        this.setState({model: e.target.value});
    }

    onNext() {
        const {brand, model} = this.state,
            result = VehicleValidate({brand, model});

        if (result.valid) {
            this.props.addCar(this.state);
        } else {
            this.setState({errors: result.errors});
        }
    }

    render() {
        const {brand, model, errors} = this.state,
            {translate} = this.props;

        return (
            <div>
                <div className="wizard-form__input">
                    <Input
                        id="brand"
                        ico="fa-circle-o"
                        value={brand}
                        onChange={this.onMarkChange}
                        error={errors.brand}
                    >{translate('wizard-trip.car_mark')}</Input>
                </div>
                <div className="wizard-form__input">
                    <Input
                        id="model"
                        value={model}
                        onChange={this.onModelChange}
                        error={errors.model}
                    >{translate('wizard-trip.car_model')}</Input>
                </div>

                <Button className="wizard-form__btn btn btn-warning btn-lg" color="warning" size="lg" role="button" onClick={this.onNext}>{translate('wizard-trip.create')}</Button>
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
