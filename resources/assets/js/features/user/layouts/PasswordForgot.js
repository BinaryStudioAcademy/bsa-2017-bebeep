import React from 'react';
import PageHeader from '../../../app/components/PageHeader';
import Input from '../../../app/components/Input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../styles/password_forgot.scss';

class PasswordForgot extends React.Component {

    render() {
        const {errors} = this.props;
        return (
            <div>
                <PageHeader header={ 'Recover password' } />
                <form method="post" action="/api/password/forgot" className="card password-form" >
                    <div className="card-header">Enter your email address and we will send you a link to reset your password.</div>
                    <div className="card-block">
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
        errors: {}
    }),
    (dispatch) =>
        bindActionCreators({}, dispatch)
)(PasswordForgot);

export default PasswordForgotConnected;
