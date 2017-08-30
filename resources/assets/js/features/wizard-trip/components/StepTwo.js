import React from 'react';
import {Input} from 'app/components/Controls/index.js';
import { Button } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addSeats} from '../actions';
import {getTranslate} from 'react-localize-redux';
import {createTripRules} from 'app/services/TripService';
import {prepareNumber} from 'app/services/WizardTripService';
import Validator from 'app/services/Validator';

class StepTwo extends React.Component {
    constructor() {
        super();
        this.state = {
            price: '',
            seats: '',
            errors: {}
        };

        this.onPriceChange = this.onPriceChange.bind(this);
        this.onSeatsChange = this.onSeatsChange.bind(this);
        this.onNext = this.onNext.bind(this);
    }

    componentWillMount() {
        this.setState({
            price: this.props.tripWizard.price || '',
            seats: this.props.tripWizard.seats || ''
        });
    }

    onPriceChange(e) {
        const value = prepareNumber(e.target.value),
            price = value || '';
        this.setState({price});
    }

    onSeatsChange(e) {
        const value = prepareNumber(e.target.value),
            seats = value || '';
        this.setState({seats});
    }

    onNext() {
        const toBeValidated = {
                price: this.state.price,
                seats: this.state.seats
            },
            {price, seats} = createTripRules(),
            validated = Validator.validate({
                price, seats
            }, toBeValidated);

        if (validated.valid) {
            this.props.addSeats(this.state);
        } else {
            this.setState({errors: validated.errors});
        }
    }

    render() {
        const {price, seats, errors} = this.state,
            {translate} = this.props;

        return (
            <div className="row">
                <div className="col-md-4 col-sm-6">
                    <Input
                        id="price"
                        ico="fa-circle-o"
                        value={price}
                        onChange={this.onPriceChange}
                        error={errors.price}
                    >{translate('wizard-trip.price_per_seat')}</Input>
                </div>
                <div className="col-md-4 col-sm-6">
                    <Input
                        id="seats"
                        value={seats}
                        onChange={this.onSeatsChange}
                        error={errors.seats}
                    >{translate('wizard-trip.places')}</Input>
                </div>
                <div className="col-md-4 col-sm-12">
                    <Button color="warning" size="lg" role="button" onClick={this.onNext}>{translate('wizard-trip.continue')}</Button>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        tripWizard: state.tripWizard.pendingTrip,
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({addSeats}, dispatch)
)(StepTwo);
