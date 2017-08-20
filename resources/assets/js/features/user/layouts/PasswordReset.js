import React from 'react';
import LangService from 'app/services/LangService';
import {UserValidator, VerifyValidator} from '../../../app/services/UserService';
import * as lang from '../lang/PasswordReset.locale.json';
import {localize} from 'react-localize-redux';
import { browserHistory } from 'react-router';

import PageHeader from 'app/components/PageHeader';
import Input from 'app/components/Input';

import UserService from '../services/UserService';

import '../styles/password_forgot.scss';

class PasswordReset extends React.Component {

    constructor() {
        super();
        this.state = {
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        LangService.addTranslation(lang);
    }

    onSubmit(e) {
        e.preventDefault();
        const data = {
                email: e.target['email'].value,
                password: e.target['password'].value,
                password_confirmation: e.target['password_confirmation'].value,
                token: e.target['token'].value,
            },
            emailCheck = UserValidator.email(data.email),
            tokenCheck = VerifyValidator.token(data.token),
            passwordCheck = UserValidator.password(data.password),
            confirmPasswordCheck = UserValidator.password_confirmation(data.password_confirmation, data.password);

        if (
            !emailCheck.valid
            ||
            !tokenCheck.valid
            ||
            !passwordCheck.valid
            ||
            !confirmPasswordCheck.valid
        ) {
            this.setState({errors: {
                email: emailCheck.valid ? '' : emailCheck.error,
                token: tokenCheck.valid ? '' : tokenCheck.error,
                password: passwordCheck.valid ? '' : passwordCheck.error,
                password_confirmation: confirmPasswordCheck.valid ? '' : confirmPasswordCheck.error,
            }});
        } else {
            UserService.resetPassword(data.email, data.token, data.password)
                .then(response => browserHistory.push('/login'))
                .catch(error => this.setState({errors: error}));
        }
    }

    render() {
        const {errors} = this.state,
            {translate} = this.props;
        return (
            <div>
                <PageHeader header={ translate('recover_password') } />
                <form method="post" action="/api/password/forgot" className="card password-form" onSubmit={this.onSubmit}>
                    <div className="card-header">{translate('reset_password_header')}</div>
                    <div className="card-block">
                        <div className={"alert alert-danger " + (errors.token ? '' : 'alert_hide')}>
                            {errors.token}
                        </div>
                        <Input
                            name="email"
                            type="email"
                            id="email"
                            error={errors.email}
                        >{translate('email')}</Input>
                        <Input
                            name="password"
                            type="password"
                            id="password"
                            error={errors.password}
                        >{translate('password')}</Input>
                        <Input
                            name="password_confirmation"
                            type="password"
                            id="password_confirmation"
                            error={errors.password_confirmation}
                        >{translate('repeat_password')}</Input>
                        <input type="hidden" name="token" value={this.props.location.query.token} />
                    </div>
                    <div className="card-footer">
                        <div className="col-sm-8 offset-sm-4">
                            <button className="btn btn-primary" role="button">{translate('reset_password')}</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default localize(PasswordReset, 'locale');
