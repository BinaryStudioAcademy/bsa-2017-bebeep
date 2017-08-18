import React from 'react';
import validate from 'validate.js';
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

    onSubmit(e) {
        e.preventDefault();
        const data = {
                email: e.target['email'].value,
                password: e.target['password'].value,
                password_confirmation: e.target['password_confirmation'].value,
                token: e.target['token'].value,
            },
            result = validate(data, {
                email: { presence: true, email: true },
                token: { presence: true },
                password: { presence: true, length: {minimum: 6} },
                password_confirmation: { equality: 'password' },
            });
        if (result) {
            this.setState({errors: result});
        } else {
            UserService.resetPassword(data.email, data.token, data.password)
                .then(response => browserHistory.push('/login'))
                .catch(error => this.setState({errors: error})
        );
        }
    }

    render() {
        const {errors} = this.state;
        return (
            <div>
                <PageHeader header={ 'Recover password' } />
                <form method="post" action="/api/password/forgot" className="card password-form" onSubmit={this.onSubmit}>
                    <div className="card-header">Reset password.</div>
                    <div className="card-block">
                        <div className={"alert alert-danger " + (errors.token ? '' : 'alert_hide')}>
                            {errors.token}
                        </div>
                        <Input
                            name="email"
                            type="email"
                            id="email"
                            error={errors.email}
                        >E-mail</Input>
                        <Input
                            name="password"
                            type="password"
                            id="password"
                            error={errors.password}
                        >Password</Input>
                        <Input
                            name="password_confirmation"
                            type="password"
                            id="password_confirmation"
                            error={errors.password_confirmation}
                        >Repeat password</Input>
                        <input type="hidden" name="token" value={this.props.location.query.token} />
                    </div>
                    <div className="card-footer">
                        <div className="col-sm-8 offset-sm-4">
                            <button className="btn btn-primary" role="button">Reset password</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default PasswordReset;
