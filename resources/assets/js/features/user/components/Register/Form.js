import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import { registerSuccess } from '../../actions';

import Input from '../../../../app/components/Input';

import { RegisterValidate } from '../../../../app/services/UserService';
import { simpleRequest } from '../../../../app/services/RequestService';

import {getTranslate} from 'react-localize-redux';

import '../../styles/user_register.scss';

class Form extends React.Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            errors: {}
        };
    }

    onSubmit(e) {
        e.preventDefault();
        const {registerSuccess, translate} = this.props,
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
            };
        const validate = RegisterValidate(registerData);
        if (!validate.valid) {
            this.setState({
                errors: validate.errors
            });
        } else {
            simpleRequest.post('/api/user/register', registerData)
                .then(
                    response => {
                        registerSuccess();
                        browserHistory.push('/registration/success');
                    },
                    error => this.setState({
                        errors: error.response.data
                    })
                );
        }
    }

    render() {
        const {errors} = this.state,
            {translate} = this.props;

        return (
            <form role="form" className="card register-form" action="/api/user/register" method="POST"
                  onSubmit={this.onSubmit}>
                <div className="card-header">
                    {translate('enter_your_credentials')}
                </div>
                <div className="card-block">
                    <Input
                        type="text"
                        name="first_name"
                        id="first_name"
                        required={false}
                        error={errors.first_name}
                    >{translate('first_name')}</Input>
                    <Input
                        type="text"
                        name="last_name"
                        id="last_name"
                        required={false}
                        error={errors.last_name}
                    >{translate('last_name')}</Input>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        required={false}
                        error={errors.email}
                    >{translate('email')}</Input>
                    <Input
                        type="tel"
                        name="phone"
                        id="phone"
                        required={false}
                        error={errors.phone}
                    >{translate('phone')}</Input>
                    <Input
                        type="date"
                        name="birth_date"
                        id="birth_date"
                        required={false}
                        error={errors.birth_date}
                    >{translate('birth_date')}</Input>
                    <div className={"form-group row " + (errors.role ? 'has-danger' : '')}>
                        <div className="col-sm-4">
                            {translate('role')}
                        </div>
                        <div className="form-check col-sm-4">
                            <label className="form-check-label">
                                <input className="form-check-input"
                                       type="checkbox"
                                       id="role_driver"
                                       name="role_driver"
                                       value="1"
                                /> {translate('driver')}
                            </label>
                        </div>
                        <div className="form-check col-sm-4">
                            <label className="form-check-label">
                                <input className="form-check-input"
                                       type="checkbox"
                                       id="role_passenger"
                                       name="role_passenger"
                                       value="1"
                                /> {translate('passenger')}
                            </label>
                        </div>
                        <div className="offset-sm-4 col-sm-8">
                            <div className="form-control-feedback">{ errors.role }</div>
                        </div>
                    </div>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        required={false}
                        error={errors.password}
                    >{translate('password')}</Input>
                    <Input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        required={false}
                        error={errors.password_confirmation}
                    >{translate('repeat_password')}</Input>
                </div>

                <div className="card-footer">
                    <div className="text-center">
                        <button className="btn btn-primary">
                            {translate('register')}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

const FormConnected = connect(
    state => ({
        translate: getTranslate(state.locale)
    }),
    (dispatch) =>
        bindActionCreators({registerSuccess}, dispatch)
)(Form);

export default FormConnected;
