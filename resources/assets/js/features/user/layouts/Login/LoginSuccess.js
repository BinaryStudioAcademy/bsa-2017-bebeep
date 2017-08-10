import React, { Component } from 'react';
import PageHeader from '../../../../app/components/PageHeader';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class LoginSuccess extends Component {

    componentWillMount() {
        if (!this.props.successLogin) {
            browserHistory.push('/login');
        } else if (this.props.failedNoUser || this.props.failedNoActivation) {
            browserHistory.push('/login/failed');
        } else {
            browserHistory.push('/dashboard');
        }
    }

    render() {

        return (
            <div>
                <PageHeader header={ 'Login' } />
                <div className="card" >
                    <div className="card-block">
                        <div className="alert alert-success" role="alert">
                            <strong>Login successful!</strong>
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
