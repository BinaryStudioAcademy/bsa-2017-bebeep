import React from 'react';
import { browserHistory } from 'react-router';
import validate from 'validate.js';

import PageHeader from 'app/components/PageHeader';

import { makeRequest } from 'app/services/RequestService';

class RegisterVerify extends React.Component {

    constructor() {
        super();
        this.state = {
            errors: {}
        };
    }

    componentWillMount() {
        const {email, token} = this.props.location.query,
            result = validate({
                email, token
            }, {
                email: {presence: true, email: true},
                token: {presence: true},
            });
        if (result) {
            this.setState({errors: result});
        } else {
            return makeRequest('post', '/api/user/verify', {
                email: email,
                token: token
            })
                .then(
                    response => browserHistory.push('/login'),
                    error => this.setState({errors: error.response.data})
                );
        }
    }

    render() {
        const {errors} = this.state;
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

export default RegisterVerify;
