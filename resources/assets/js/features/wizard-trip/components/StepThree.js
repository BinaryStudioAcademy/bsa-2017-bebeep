import React from 'react';
import PropTypes from 'prop-types';
import {Input} from 'app/components/Controls/index.js';
import { Button } from 'reactstrap';

class StepThree extends React.Component {
    constructor() {
        super();
        this.state = {
            mark: '',
            model: ''
        };

        this.onMarkChange = this.onMarkChange.bind(this);
        this.onModelChange = this.onModelChange.bind(this);
        this.onNext = this.onNext.bind(this);
    }
    onMarkChange(e) {
        this.setState({mark: e.target.value});
    }
    onModelChange(e) {
        this.setState({model: e.target.value});
    }

    onNext() {
        const {onNext} = this.props;
        onNext(this.state);
    }

    render() {
        const {mark, model} = this.state;

        return (
            <div className="row">
                <div className="col-md-4 col-sm-6">
                    <Input
                        id="mark"
                        ico="fa-circle-o"
                        value={mark}
                        onChange={this.onMarkChange}
                        error=""
                    >Марка авто</Input>
                </div>
                <div className="col-md-4 col-sm-6">
                    <Input
                        id="model"
                        value={model}
                        onChange={this.onModelChange}
                        error=""
                    >Модель авто</Input>
                </div>
                <div className="col-md-4 col-sm-12">
                    <Button color="warning" size="lg" role="button" onClick={this.onNext}>Продолжить</Button>
                </div>
            </div>
        );
    }
}

StepThree.PropTypes = {
    onNext: PropTypes.func.required
};

export default StepThree;
