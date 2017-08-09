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
            browserHistory.push('/');
        }
    }
    render() {

        return (
            <div>
                <PageHeader header={ 'Verify account' } />
                <div className="card" >
                    <div className="card-block">
                        <div className="alert alert-danger" role="alert">
                            <strong>Verify failed: </strong> {this.props.errors.token}
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
