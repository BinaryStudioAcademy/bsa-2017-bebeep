import React from 'react';
import {InputPlaces, InputDate} from 'app/components/Controls/index.js';
import { Button } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addLocation} from '../actions';
import {getTranslate} from 'react-localize-redux';
import {createTripRules} from 'app/services/TripService';
import Validator from 'app/services/Validator';

class StepOne extends React.Component {

    constructor() {
        super();

        this.state = {
            from: {
                place: null,
                address: ''
            },
            to: {
                place: null,
                address: ''
            },
            start_at: null,
            errors: {}
        };

        this.onSelectedFrom = this.onSelectedFrom.bind(this);
        this.onSelectedTo = this.onSelectedTo.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onNext= this.onNext.bind(this);
    }

    componentWillMount() {
        this.setState({
            from: this.props.tripWizard.from,
            to: this.props.tripWizard.to,
            start_at: this.props.tripWizard.start_at,
        });
    }

    onSelectedFrom(from) {
        this.setState({from});
    }

    onSelectedTo(to) {
        this.setState({to});
    }

    onChangeDate(start_at) {
        this.setState({start_at});
    }

    onNext() {
        const toBeValidated = {
                from: this.state.from.place,
                to: this.state.to.place,
                start_at: this.state.start_at,
            },
            {from, to, start_at} = createTripRules(),
            validated = Validator.validate({
                from, to, start_at
            }, toBeValidated);

        if (validated.valid) {
            this.props.addLocation(this.state);
        } else {
            this.setState({errors: validated.errors});
        }
    }

    render() {
        const {start_at, errors} = this.state;

        return (
            <div className="row">
                <div className="col-md-3 col-sm-4">
                    <InputPlaces
                        id="trip_from"
                        ico="fa-circle-o"
                        onChange={this.onSelectedFrom}
                        error={errors.from}
                    >Откуда</InputPlaces>
                </div>
                <div className="col-md-3 col-sm-4">
                    <InputPlaces
                        id="trip_to"
                        onChange={this.onSelectedTo}
                        error={errors.to}
                    >Куда</InputPlaces>
                </div>
                <div className="col-md-3 col-sm-4">
                    <InputDate
                        id="trip_date"
                        value={start_at}
                        onChange={this.onChangeDate}
                        label="Когда"
                        error={errors.start_at}
                    />
                </div>
                <div className="col-md-3 col-sm-12">
                    <Button color="warning" size="lg" role="button" onClick={this.onNext}>Продолжить</Button>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        tripWizard: state.tripWizard,
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({addLocation}, dispatch)
)(StepOne);
