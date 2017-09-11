import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { getTranslate } from 'react-localize-redux';
import moment from 'moment';

import { InputDateTime } from 'app/components/Controls';
import Input from 'app/components/Input';

import {
    doRegister,
    registerSuccess,
    userBookingSetState,
    userFormRoleSetState,
    userHaveBookingSetState
} from 'features/user/actions';
import { completeTrip } from 'features/wizard-trip/actions';

import AuthService from 'app/services/AuthService';
import BookingService from 'app/services/BookingService';
import { RegisterValidate, checkPassengerRole } from 'app/services/UserService';
import { STEP_THREE, savePendingTrip, isTripReady } from 'app/services/WizardTripService';

import 'features/user/styles/user_register.scss';

class Form extends React.Component {

    constructor() {
        super();

        this.state = {
            hasTripPending: false,
            errors: {},
        };

        this.onSubmit = this.onSubmit.bind(this);
    }

    createBooking() {
        const {
            booking: { tripId, routes, seats },
            userBookingSetState,
            userFormRoleSetState,
            userHaveBookingSetState,
        } = this.props;

        BookingService.createBooking(tripId, { routes, seats })
            .then(data => {
                userBookingSetState(null);
                userFormRoleSetState(null);
                userHaveBookingSetState(false);

                browserHistory.push('/bookings');
            })
            .catch(error => {});
    }

    componentWillMount() {
        const { stepWizard, tripPending } = this.props;

        if (stepWizard === STEP_THREE) {
            this.setState({
                hasTripPending: isTripReady(tripPending),
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (! this.state.hasTripPending && nextProps.stepWizard === STEP_THREE) {
            this.setState({
                hasTripPending: isTripReady(nextProps.tripPending),
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const { hasTripPending } = this.state,
            {
                doRegister,
                registerSuccess,
                tripPending,
                completeTrip,
                userHaveBooking,
            } = this.props;

        const form = e.target,
            registerData = {
                first_name: form.first_name.value,
                last_name: form.last_name.value,
                phone: form.phone.value,
                email: form.email.value,
                birth_date: form.birth_date.value,
                role_driver: form.role_driver.checked,
                role_passenger: form.role_passenger.checked,
                password: form.password.value,
                password_confirmation: form.password_confirmation.value,
            },
            validate = RegisterValidate(registerData);

        if (! validate.valid) {
            this.setState({ errors: validate.errors, });
            return;
        }

        doRegister(registerData)
            .then(
                response => {
                    registerSuccess();
                    AuthService.initSession(response.token);

                    if (hasTripPending) {
                        savePendingTrip(tripPending).then(() => {
                            completeTrip();
                            browserHistory.push('/trips');
                        });
                    } else if (userHaveBooking) {
                        this.createBooking();
                    } else {
                        browserHistory.push('/dashboard');
                    }
                }
            )
            .catch(error => {
                this.setState({ errors: error, });
            });
    }

    isValidDate(current) {
        return current.isBefore(moment());
    }

    render() {
        const { translate, userRole } = this.props,
            { errors, hasTripPending } = this.state,
            passengerCheck = checkPassengerRole(userRole);

        return (
            <form role="form"
                method="POST"
                action="/api/user/register"
                className="card register-form"
                onSubmit={this.onSubmit}
            >
                <div className="card-header">
                    {translate('register_form.enter_your_credentials')}
                </div>
                <div className="card-block">
                    <Input
                        type="text"
                        name="first_name"
                        id="first_name"
                        required={false}
                        error={errors.first_name}
                    >{translate('register_form.first_name')}</Input>
                    <Input
                        type="text"
                        name="last_name"
                        id="last_name"
                        required={false}
                        error={errors.last_name}
                    >{translate('register_form.last_name')}</Input>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        required={false}
                        error={errors.email}
                    >{translate('register_form.email')}</Input>
                    <Input
                        type="tel"
                        name="phone"
                        id="phone"
                        required={false}
                        error={errors.phone}
                    >{translate('register_form.phone')}</Input>

                    <div className={ "form-group row " + (errors.birth_date ? 'has-danger' : '') }>
                        <label htmlFor="birth_date"
                            className='form-control-label text-muted col-sm-4'
                        >{translate('register_form.birth_date')}</label>

                        <div className="col-md-8">
                            <InputDateTime
                                id="birth_date"
                                isValidDate={this.isValidDate}
                                timeFormat={false}
                                inputProps={{ name: 'birth_date', id: 'birth_date' }}
                                labelClasses="register-form-label"
                                wrapperClasses="register-form-birth_date"
                                error={errors.birth_date}
                            />
                        </div>
                    </div>

                    <div className={"form-group row " + (errors.role ? 'has-danger' : '')}>
                        <div className="col-sm-4 text-muted">
                            {translate('register_form.role')}
                        </div>
                        <div className="form-check col-sm-4">
                            <label className="form-check-label">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="role_driver"
                                    name="role_driver"
                                    value="1"
                                    defaultChecked={hasTripPending}
                                /> {translate('register_form.driver')}
                            </label>
                        </div>
                        <div className="form-check col-sm-4">
                            <label className="form-check-label">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="role_passenger"
                                    name="role_passenger"
                                    value="1"
                                    defaultChecked={passengerCheck}
                                /> {translate('register_form.passenger')}
                            </label>
                        </div>
                        <div className="offset-sm-4 col-sm-8">
                            <div className="form-control-feedback">{errors.role}</div>
                        </div>
                    </div>

                    <Input
                        type="password"
                        name="password"
                        id="password"
                        required={false}
                        error={errors.password}
                    >{translate('register_form.password')}</Input>
                    <Input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        required={false}
                        error={errors.password_confirmation}
                    >{translate('register_form.repeat_password')}</Input>
                </div>

                <div className="card-footer">
                    <div className="text-center">
                        <button className="btn btn-primary">
                            {translate('register_form.register')}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

const FormConnected = connect(
    state => ({
        booking: state.user.booking,
        userLogin: state.user.login.success,
        userRole: state.user.isPassenger,
        userHaveBooking: state.user.userHaveBooking,
        stepWizard: state.tripWizard.step,
        tripPending: state.tripWizard.pendingTrip,
        translate: getTranslate(state.locale),
    }),
    dispatch => bindActionCreators({
        doRegister,
        registerSuccess,
        completeTrip,
        userBookingSetState,
        userFormRoleSetState,
        userHaveBookingSetState,
    }, dispatch)
)(Form);

export default FormConnected;
