import React from 'react';
import PropTypes from 'prop-types';
import {Input} from 'app/components/Controls/index.js';
import { Button } from 'reactstrap';

class StepTwo extends React.Component {
    constructor() {
        super();
        this.state = {
            price: '',
            seats: ''
        };

        this.onPriceChange = this.onPriceChange.bind(this);
        this.onSeatsChange = this.onSeatsChange.bind(this);
        this.onNext = this.onNext.bind(this);
    }
    onPriceChange(e) {
        const value = e.target.value.match(/[0-9]+/),
            price = value && !isNaN(+value[0]) ? +value[0] : (value && value.length !== 0 ? this.state.price : '');
            this.setState({price});
    }
    onSeatsChange(e) {
        const value = +e.target.value,
            seats = value && !isNaN(value) && value > 0 ? value : (value <= 0 ? '' : this.state.seats);
        this.setState({seats});
    }

    onNext() {
        const {onNext} = this.props;
        onNext(this.state);
    }

    render() {
        const {price, seats} = this.state;

        return (
            <div className="row">
                <div className="col-md-4 col-sm-6">
                    <Input
                        id="price"
                        ico="fa-circle-o"
                        value={price}
                        onChange={this.onPriceChange}
                        error=""
                    >Цена за место</Input>
                </div>
                <div className="col-md-4 col-sm-6">
                    <Input
                        id="seats"
                        value={seats}
                        onChange={this.onSeatsChange}
                        error=""
                    >Количество мест</Input>
                </div>
                <div className="col-md-4 col-sm-12">
                    <Button color="warning" size="lg" role="button" onClick={this.onNext}>Продолжить</Button>
                </div>
            </div>
        );
    }
}

StepTwo.PropTypes = {
    onNext: PropTypes.func.required
};

export default StepTwo;
