import React from 'react';
import LangService from 'app/services/LangService';
import * as lang from '../lang/WizardTrip.json';
import StepOne from '../components/StepOne';
import StepTwo from '../components/StepTwo';
import StepThree from '../components/StepThree';
import {STEP_ONE, STEP_TWO, STEP_THREE, COMPLETE} from '../services/WizardTripService';
import '../styles/wizard-trip.scss';

class WizardTrip extends React.Component {

    constructor() {
        super();

        this.state = {
            step: STEP_ONE,
            from: {},
            to: {},
            date: null,
        };

        this.stepOneComplete = this.stepOneComplete.bind(this);
        this.stepTwoComplete = this.stepTwoComplete.bind(this);
        this.stepThreeComplete = this.stepThreeComplete.bind(this);
    }

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    stepOneComplete(data) {
        this.setState({
            from: data.from,
            to: data.to,
            date: data.date,
            step: STEP_TWO
        });
    }

    stepTwoComplete(data) {
        this.setState({
            step: STEP_THREE
        });
    }

    stepThreeComplete(data) {
        this.setState({
            step: COMPLETE
        });
    }

    render() {
        const {step, from, to, date} = this.state;

        return (
            <div className="container wizard-trip">
                <div className={"wizard-trip__step" + (step === STEP_ONE
                        ? ' wizard-trip__step_active'
                        : ''
                    )}
                >
                    <StepOne onNext={this.stepOneComplete} />
                </div>
                <div className={"wizard-trip__step" + (step === STEP_TWO
                        ? ' wizard-trip__step_active'
                        : ''
                    )}
                >
                    <StepTwo onNext={this.stepTwoComplete} />
                </div>
                <div className={"wizard-trip__step" + (step === STEP_THREE
                        ? ' wizard-trip__step_active'
                        : ''
                    )}
                >
                    <StepThree onNext={this.stepThreeComplete} />
                </div>
                <div className={"wizard-trip__step" + (step === COMPLETE
                        ? ' wizard-trip__step_active'
                        : ''
                )}
                >

                </div>
            </div>
        );
    }
}

export default WizardTrip;
