import React from 'react';
import { doVerify } from '../actions';
import PageHeader from '../../../app/components/PageHeader';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class RegisterVerify extends React.Component {

    componentWillMount() {
        const {email, token} = this.props.location.query;
        this.props.dispatch(doVerify(email, token));
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
                        <div className={"alert " + (errors.token ? 'alert-danger' : '')} role="alert">
                            { errors.token || 'Verifying...' }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const RegisterVerifyConnected = connect(
    (state) => ({
        successVerify: state.user.register.verify.success,
        errors: state.user.register.verify.errors
    })
)(RegisterVerify);

export default RegisterVerifyConnected;
