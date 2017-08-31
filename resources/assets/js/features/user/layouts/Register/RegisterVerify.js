import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getTranslate } from 'react-localize-redux';
import validate from 'validate.js';

import ContainerWrapper from 'app/layouts/ContainerWrapper';
import PageHeader from 'app/components/PageHeader';

import { simpleRequest } from 'app/services/RequestService';

import LangService from 'app/services/LangService';
import * as lang from 'features/user/lang/Register/RegisterVerify.locale.json';


class RegisterVerify extends React.Component {

    constructor() {
        super();
        this.state = {
            errors: {}
        };
    }

    componentWillMount() {
        LangService.addTranslation(lang);

        const {email, token} = this.props.location.query,
            result = validate({
                email, token
            }, {
                email: {presence: {message: 'validate.email_invalid'}, email: {message: 'validate.email_invalid'}},
                token: {presence: {message: 'validate.token_invalid'}}
            }, {fullMessages: false});

        if (result) {
            this.setState({errors: _.reduce(result, (acc, err, key) => {
                acc[key] = err && this.props.translate(err instanceof Array ? err[0] : err);
                return acc;
            }, {})});

        } else {
            return simpleRequest.post('/api/user/verify', {
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
        const { errors } = this.state,
            { translate } = this.props;

        return (
            <ContainerWrapper>
                <PageHeader header={ translate('register_verify.verify_account') } />
                <div className="card" >
                    <div className="card-block">
                        <div className={"alert " + (errors.token || errors.email ? 'alert-danger' : '')} role="alert">
                            { errors.token || errors.email || translate('register_verify.verifying') }
                        </div>
                    </div>
                </div>
            </ContainerWrapper>
        );
    }
}

export default connect(
    state => ({
        translate: getTranslate(state.locale)
    })
)(RegisterVerify);
