import React from 'react';
import PageHeader from '../../../app/components/PageHeader';
import Input from '../../../app/components/Input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../styles/password_forgot.scss';

class PasswordReset extends React.Component {

    render() {
        const {errors} = this.props;
        return (
            <div>
                <PageHeader header={ 'Recover password' } />
                <form method="post" action="/api/password/forgot" className="card password-form" >
                    <div className="card-header">Reset password.</div>
                    <div className="card-block">
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
                            type="password_confirmation"
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
        errors: {}
    }),
    (dispatch) =>
        bindActionCreators({}, dispatch)
)(PasswordReset);

export default PasswordResetConnected;
