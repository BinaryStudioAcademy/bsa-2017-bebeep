import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import PageHeader from 'app/components/PageHeader';

class RegisterSuccess extends Component {

    componentWillMount() {
        if (!this.props.successRegister) {
            browserHistory.push('/registration');
        }
    }

    render() {
        return (
            <div>
                <PageHeader header={ 'Register' } />
                <div className="card" >
                    <div className="card-block">
                        <div className="alert alert-success" role="alert">
                            <strong>Register successful!</strong> The verification link has been sent to your email
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const RegisterSuccessConnected = connect(
    (state) => ({
        successRegister: state.user.register.success
    })
)(RegisterSuccess);

export default RegisterSuccessConnected;
