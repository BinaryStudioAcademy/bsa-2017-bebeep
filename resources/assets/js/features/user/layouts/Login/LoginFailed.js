import React, { Component } from 'react';
import PageHeader from '../../../../app/components/PageHeader';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';

class LoginSuccess extends Component {

    constructor(props) {
        super(props);
        if (this.props.successLogin) {
            browserHistory.push('/dashboard');
        }
    }

    render() {

        let resp = {};
        if (this.props.failedNoActivation) {
            resp = {
                msg: "Your user wasn't activated yet! To receive activation email click ",
                url: "/register/verify"
            };
        } else {
            resp = {
                msg: "No such user registered! For registration click ",
                url: "/register"
            };
        }

        return (
            <div>
                <PageHeader header={ 'Login' } />
                <div className="card login-form" >
                    <div className="card-header">Your credentials didn't work</div>
                    <div className="card-block">
                        <div className="alert alert-error" role="alert">
                            <p>{resp.msg} <a href={resp.url}>here</a></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const LoginSuccessConnected = connect(
    (state) => ({
        successLogin: state.user.login.success,
        failedNoUser: state.user.login.failedNoUser,
        failedNoActivation: state.user.login.failedNoActivation
    })
)(LoginSuccess);

export default LoginSuccessConnected;
