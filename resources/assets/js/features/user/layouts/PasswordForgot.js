import React from 'react';
import PageHeader from '../../../app/components/PageHeader';
import Input from '../../../app/components/Input';
import { makeRequest } from '../../../app/services/RequestService';
import validate from 'validate.js';
import '../styles/password_forgot.scss';

class PasswordForgot extends React.Component {
    constructor() {
        super();
        this.state = {
            success: false,
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const email = e.target['email'].value,
            error = validate.single(email, {presence: true, email: true});
        if (error) {
            this.setState({
                success: false,
                errors: { email: error.join(', ') }
            });
        } else {
            makeRequest('post', '/api/authorization', {
                    email: email,
                    type: 'reset-password'
                }).then(
                    response => this.setState({
                        success: true,
                        errors: {}
                    }),
                    error => this.setState({
                        success: false,
                        errors: error.response.data
                    })
                );
        }
    }

    render() {
        const {errors, success} = this.state;
        return (
            <div>
                <PageHeader header={ 'Recover password' } />
                <form method="post" action="/api/password/forgot" className="card password-form" onSubmit={this.onSubmit}>
                    <div className="card-header">Enter your email address and we will send you a link to reset your password.</div>
                    <div className="card-block">
                        <div className={"alert alert-success " + (success ? '' : 'alert_hide')}>
                            Link to reset password send to your email
                        </div>
                        <Input
                            name="email"
                            type="email"
                            id="email"
                            error={errors.email}
                        >E-mail</Input>
                    </div>
                    <div className="card-footer">
                        <div className="col-sm-8 offset-sm-4">
                            <button className="btn btn-primary" role="button">Send password reset email</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default PasswordForgot;
