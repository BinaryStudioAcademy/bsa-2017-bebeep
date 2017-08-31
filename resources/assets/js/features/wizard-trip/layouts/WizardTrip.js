import React from 'react';
import LangService from 'app/services/LangService';
import * as lang from '../lang/WizardTrip.json';
import StepOne from '../components/StepOne';
import StepTwo from '../components/StepTwo';
import StepThree from '../components/StepThree';
import {INIT, STEP_ONE, STEP_TWO, STEP_THREE, savePendingTrip, isTripReady} from 'app/services/WizardTripService';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {completeTrip} from '../actions';
import AuthService from 'app/services/AuthService';
import {browserHistory} from 'react-router';
import '../styles/wizard-trip.scss';

class WizardTrip extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    componentWillReceiveProps(nextProps) {
        const {tripData, completeTrip} = nextProps;

        if (nextProps.step === STEP_THREE && isTripReady(tripData)) {
            if (AuthService.isAuthorized()) {
                savePendingTrip(tripData).then(() => {
                    completeTrip();
                    browserHistory.push('/trips');
                });
            } else {
                browserHistory.push('/registration');
            }
        }
    }

    render() {
        const {step} = this.props;

        return (
            <div className="container wizard-trip">
                <div className={"wizard-trip__step" + (step === INIT
                        ? ' wizard-trip__step--active'
                        : ''
                    )}
                >
                    <StepOne />
                </div>
                <div className={"wizard-trip__step" + (step === STEP_ONE
                        ? ' wizard-trip__step--active'
                        : ''
                    )}
                >
                    <StepTwo />
                </div>
                <div className={"wizard-trip__step" + (step === STEP_TWO || step === STEP_THREE
                        ? ' wizard-trip__step--active'
                        : ''
                    )}
                >
                    <StepThree />
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
