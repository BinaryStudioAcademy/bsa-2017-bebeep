import React from 'react';
import { InputPlaces, InputDateTime } from 'app/components/Controls';
import { Button } from 'reactstrap';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { addLocation } from '../actions';
import { getTranslate } from 'react-localize-redux';
import { createTripRules, getStartAndEndTime } from 'app/services/TripService';
import Validator from 'app/services/Validator';
import TripRoute from 'app/helpers/TripRoute';
import moment from 'moment';

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
        const {from , to, start_at} = this.props.tripWizard;

        this.setState({
            from: {
                place: from,
                address: to && from.formatted_address
            },
            to: {
                place: to,
                address: to && to.formatted_address
            },
            start_at: start_at ? moment(start_at) : start_at
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
        const directionService = new google.maps.DirectionsService();

        directionService.route({
            origin: this.state.from.address,
            destination: this.state.to.address,
            waypoints: [],
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                const route = new TripRoute(result.routes[0]),
                    time = getStartAndEndTime(this.state.start_at, route.getDurationRaw()),
                    toBeValidated = {
                        from: this.state.from.place,
                        to: this.state.to.place,
                        start_at: time.start_at,
                        end_at: time.end_at
                    },
                    {from, to, start_at, end_at} = createTripRules(),
                    validated = Validator.validate({
                        from, to, start_at, end_at
                    }, toBeValidated);

                if (validated.valid) {
                    this.props.addLocation(toBeValidated);
                } else {
                    this.setState({errors: validated.errors});
                }
            }
        });
    }

    isValidDate(current){
        return current.isAfter(moment().subtract( 1, 'day' ));
    };

    render() {
        const {start_at, errors} = this.state,
            {translate} = this.props;

        return (
            <div>
                <div className="wizard-form__input">
                    <InputPlaces
                        id="trip_from"
                        ico="fa-circle-o"
                        onChange={this.onSelectedFrom}
                        error={errors.from}
                    >{translate('wizard-trip.from')}</InputPlaces>
                </div>
                <div className="wizard-form__input">
                    <InputPlaces
                        id="trip_to"
                        onChange={this.onSelectedTo}
                        error={errors.to}
                    >{translate('wizard-trip.to')}</InputPlaces>
                </div>
                <div className="wizard-form__input wizard-form__input_calendar_datetime">
                    <InputDateTime
                        id="trip_date"
                        value={start_at}
                        inputProps={{name: 'trip_date', id:'trip_date'}}
                        timeFormat={true}
                        labelClasses='form-input fa-calendar'
                        isValidDate={this.isValidDate}
                        onChange={this.onChangeDate}
                        label={translate('wizard-trip.when')}
                        error={errors.start_at}
                        className="wizard-form__input_calendar-datetimepicker"
                    />
                </div>

                <Button className="wizard-form__btn btn btn-warning btn-lg" color="warning" size="lg" role="button" onClick={this.onNext}>{translate('wizard-trip.continue')}</Button>
            </div>
        );
    }
}

export default connect(
    state => ({
        tripWizard: state.tripWizard.pendingTrip,
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({addLocation}, dispatch)
)(StepOne);
