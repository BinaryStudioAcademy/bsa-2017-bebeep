import React from 'react';
import PageHeader from '../../../app/components/PageHeader';
import Input from '../../../app/components/Input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {resetPassword} from '../actions';
import { browserHistory } from 'react-router';
import '../styles/password_forgot.scss';

class PasswordReset extends React.Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.resetPassword({
            email: e.target['email'].value,
            password: e.target['password'].value,
            password_confirmation: e.target['password_confirmation'].value,
            token: e.target['token'].value,
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.success) {
            browserHistory.push('/login');
        }
    }

    render() {
        const {errors} = this.props;
        return (
            <div>
                <PageHeader header={ 'Recover password' } />
                <form method="post" action="/api/password/forgot" className="card password-form" onSubmit={this.onSubmit}>
                    <div className="card-header">Reset password.</div>
                    <div className="card-block">
                        <div className={"alert alert-danger" + (errors.token ? '' : 'alert_hide')}>
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

const PasswordResetConnected = connect(
    (state) => ({
        errors: state.user.password.reset.errors,
        success: state.user.password.reset.success
    }),
    (dispatch) =>
        bindActionCreators({resetPassword}, dispatch)
)(PasswordReset);

export default PasswordResetConnected;
