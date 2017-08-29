import React from 'react';
import PropTypes from 'prop-types';
import {InputPlaces, InputDate} from 'app/components/Controls/index.js';
import { Button } from 'reactstrap';

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
            date: null
        };

        this.onSelectedFrom = this.onSelectedFrom.bind(this);
        this.onSelectedTo = this.onSelectedTo.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onNext = this.onNext.bind(this);
    }

    onSelectedFrom(from) {
        this.setState({from});
    }

    onSelectedTo(to) {
        this.setState({to});
    }

    onChangeDate(date) {
        this.setState({date});
    }

    onNext(e) {
        e.preventDefault();
        this.props.onNext(this.state);
    }

    render() {
        const {date} = this.state;

        return (
            <div className="row">
                <div className="col-md-3 col-sm-4">
                    <InputPlaces
                        id="trip_from"
                        ico="fa-circle-o"
                        onChange={this.onSelectedFrom}
                        error=""
                    >Откуда</InputPlaces>
                </div>
                <div className="col-md-3 col-sm-4">
                    <InputPlaces
                        id="trip_to"
                        onChange={this.onSelectedTo}
                        error=""
                    >Куда</InputPlaces>
                </div>
                <div className="col-md-3 col-sm-4">
                    <InputDate
                        id="trip_date"
                        value={date}
                        onChange={this.onChangeDate}
                        label="Когда"
                        error=""
                    />
                </div>
                <div className="col-md-3 col-sm-12">
                    <Button color="warning" size="lg" role="button" onClick={this.onNext}>Продолжить</Button>
                </div>
            </div>
        );
    }
}

StepOne.PropTypes = {
    onNext: PropTypes.func.required
};

export default StepOne;
