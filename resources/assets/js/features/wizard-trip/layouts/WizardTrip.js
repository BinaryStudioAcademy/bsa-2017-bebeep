import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import StepOne from '../components/StepOne';
import StepTwo from '../components/StepTwo';
import StepThree from '../components/StepThree';
import {
    INIT, STEP_ONE, STEP_TWO, STEP_THREE, savePendingTrip, isTripReady
} from 'app/services/WizardTripService';

import { completeTrip } from '../actions';

import AuthService from 'app/services/AuthService';

import LangService from 'app/services/LangService';
import * as lang from '../lang/WizardTrip.json';

import '../styles/wizard-trip.scss';


class WizardTrip extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    componentWillReceiveProps(nextProps) {
        const { tripData, completeTrip } = nextProps;

        if (nextProps.step === STEP_THREE && isTripReady(tripData)) {

            if (! AuthService.isAuthorized()) {
                browserHistory.push('/registration');
                return;
            }

            savePendingTrip(tripData).then(() => {
                completeTrip();
                browserHistory.push('/trips');
            });
        }
    }

    stepIs(step) {
        return this.props.step === step;
    }

    render() {
        return (
            <div>
                <div className={"wizard-trip__step" + (this.stepIs(INIT)
                        ? ' wizard-trip__step--active'
                        : ''
                    )}
                >
                    <StepOne />
                </div>
                <div className={"wizard-trip__step" + (this.stepIs(STEP_ONE)
                        ? ' wizard-trip__step--active'
                        : ''
                    )}
                >
                    <StepTwo />
                </div>
                <div className={"wizard-trip__step" + (this.stepIs(STEP_TWO) || this.stepIs(STEP_THREE)
                        ? ' wizard-trip__step--active'
                        : ''
                    )}
                >
                    <StepThree />
                </div>

                <div className="home-slider__steps wizard-steps">
                    <a href="#" className={'wizard-steps__step ' + (this.stepIs(INIT) ? 'wizard-steps__step_active' : '')}>1</a>
                    <a href="#" className={'wizard-steps__step ' + (this.stepIs(STEP_ONE) ? 'wizard-steps__step_active' : '')}>2</a>
                    <a href="#" className={'wizard-steps__step ' + (this.stepIs(STEP_TWO) ? 'wizard-steps__step_active' : '')}>3</a>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        step: state.tripWizard.step,
        tripData: state.tripWizard.pendingTrip
    }),
    dispatch => bindActionCreators({completeTrip}, dispatch)
)(WizardTrip);
