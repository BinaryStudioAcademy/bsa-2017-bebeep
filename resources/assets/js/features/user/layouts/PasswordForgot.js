import React from 'react';
import PageHeader from '../../../app/components/PageHeader';
import Input from '../../../app/components/Input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {forgotPasswordSuccess, forgotPasswordFailed} from '../actions';
import UserManager from '../services/UserManager';
import '../styles/password_forgot.scss';

class PasswordForgot extends React.Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        const { forgotPasswordSuccess, forgotPasswordFailed } = this.props;
        e.preventDefault();
        UserManager.forgotPassword(e.target['email'].value)
            .then(data => forgotPasswordSuccess())
            .catch(error => forgotPasswordFailed(error));
    }

    render() {
        const {errors, success} = this.props;
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

const PasswordForgotConnected = connect(
    (state) => ({
        errors: state.user.password.forgot.errors,
        success: state.user.password.forgot.success,
    }),
    (dispatch) =>
        bindActionCreators({ forgotPasswordSuccess, forgotPasswordFailed }, dispatch)
)(PasswordForgot);

export default PasswordForgotConnected;
