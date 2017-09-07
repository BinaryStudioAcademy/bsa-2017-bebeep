import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import {InputDateTime} from 'app/components/Controls';
import Input from 'app/components/Input';
import moment from 'moment';

import {
    registerSuccess,
    loginSuccess,
    userBookingSetState,
    userFormRoleSetState,
    userHaveBookingSetState
} from 'features/user/actions';

import {simpleRequest} from 'app/services/RequestService';
import BookingService from 'app/services/BookingService';
import {RegisterValidate, checkPassengerRole} from 'app/services/UserService';
import { initSession, destroySession, getAuthUser } from 'app/services/AuthService';

import {getTranslate} from 'react-localize-redux';

import {STEP_THREE, savePendingTrip, isTripReady} from 'app/services/WizardTripService';
import {completeTrip} from 'features/wizard-trip/actions';

import 'features/user/styles/user_register.scss';

class Form extends React.Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            hasTripPending: false,
            errors: {}
        };
    }

    createBooking() {
        const {tripId, routes, seats} = this.props.booking;

        BookingService.createBooking(tripId, {
            routes,
            seats
        }).then((data) => {
            this.props.userBookingSetState(null);
            this.props.userFormRoleSetState(null);
            this.props.userHaveBookingSetState(false);
            browserHistory.push('/bookings');
        }).catch((error) => {

        });
    }

    componentWillMount() {
        if (this.props.stepWizard === STEP_THREE) {
            this.setState({hasTripPending: isTripReady(this.props.tripPending)});
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.hasTripPending && nextProps.stepWizard === STEP_THREE) {
            this.setState({hasTripPending: isTripReady(nextProps.tripPending)});
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const {registerSuccess, loginSuccess, tripPending, completeTrip} = this.props,
            {hasTripPending} = this.state,
            registerData = {
                first_name: e.target['first_name'].value,
                last_name: e.target['last_name'].value,
                phone: e.target['phone'].value,
                email: e.target['email'].value,
                birth_date: e.target['birth_date'].value,
                role_driver: e.target['role_driver'].checked,
                role_passenger: e.target['role_passenger'].checked,
                password: e.target['password'].value,
                password_confirmation: e.target['password_confirmation'].value
            },
            validate = RegisterValidate(registerData);

        if (!validate.valid) {
            this.setState({
                errors: validate.errors
            });
        } else {
            simpleRequest.post('/api/user/register', registerData)
                .then(
                    response => {
                        initSession(response.data.token);
                        registerSuccess();
                        loginSuccess(getAuthUser());

                        if (hasTripPending) {
                            savePendingTrip(tripPending).then(() => {
                                completeTrip();
                                browserHistory.push('/trips');
                            });
                        } else if (this.props.userHaveBooking) {
                            this.createBooking();
                        } else {
                            browserHistory.push('/dashboard');
                        }
                    }
                )
                .catch(error => {
                        this.setState({errors: error.response.data});
                        destroySession();
                    }
                );
        }
    }
    isValidDate(current) {
        return current.isBefore(moment());
    }


    render() {

        const {errors, hasTripPending} = this.state,
            {translate, userRole} = this.props;
        const passengerCheck = checkPassengerRole(userRole);


        return (
            <form role="form" className="card register-form" action="/api/user/register" method="POST"
                  onSubmit={this.onSubmit}>
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
                        <label htmlFor='birth_date' className='form-control-label text-muted col-sm-4'>{translate('register_form.birth_date')}</label>
                        <div className="col-md-8">
                            <InputDateTime
                                id="birth_date"
                                isValidDate={this.isValidDate}
                                timeFormat={false}
                                inputProps={{name: 'birth_date', id:'birth_date'}}
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
                                <input className="form-check-input"
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
                                <input className="form-check-input"
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
        translate: getTranslate(state.locale)
    }),
    (dispatch) =>
        bindActionCreators({
            registerSuccess,
            loginSuccess,
            completeTrip,
            userBookingSetState,
            userFormRoleSetState,
            userHaveBookingSetState
        }, dispatch)
)(Form);

export default FormConnected;
