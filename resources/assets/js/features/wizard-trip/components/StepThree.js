import React from 'react';
import {Input} from 'app/components/Controls/index.js';
import { Button } from 'reactstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addCar} from '../actions';
import {getTranslate} from 'react-localize-redux';

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
        this.props.addCar(this.state);
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

export default connect(
    state => ({
        tripWizard: state.tripWizard,
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({addCar}, dispatch)
)(StepThree);
