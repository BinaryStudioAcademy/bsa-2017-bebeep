import React from 'react';
import { verifyFailed, verifySuccess } from '../actions';
import PageHeader from '../../../app/components/PageHeader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { RegisterRequest } from '../services/RequestService'

class RegisterVerify extends React.Component {

    componentWillMount() {
        const {email, token} = this.props.location.query,
            {verifySuccess, verifyFailed} = this.props;
        RegisterRequest.doVerify(email, token)
            .then(data => verifySuccess(data))
            .catch(error => verifyFailed(error));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.successVerify) {
            browserHistory.push('/login');
        }
    }
    render() {
        const {errors} = this.props;
        return (
            <div>
                <PageHeader header={ 'Verify account' } />
                <div className="card" >
                    <div className="card-block">
                        <div className={"alert " + (errors.token || errors.email ? 'alert-danger' : '')} role="alert">
                            { errors.token || errors.email || 'Verifying...' }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const RegisterVerifyConnected = connect(
    (state) => ({
        successVerify: state.user.verify.success,
        errors: state.user.verify.errors
    }),
    (dispatch) =>
        bindActionCreators({verifyFailed, verifySuccess}, dispatch)
)(RegisterVerify);

export default RegisterVerifyConnected;
