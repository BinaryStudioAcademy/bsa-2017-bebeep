import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../../actions';
import {getTranslate} from 'react-localize-redux';

import TextInput from './TextInput';
import PasswordForgotModal from '../_Modals/PasswordForgotModal';

import '../../styles/user.scss';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = { credentials: { email: '', password: '' }, forgotModalIsOpen: false };
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.pickErrorMessage = this.pickErrorMessage.bind(this);
    }

    pickErrorMessage(code) {
        const {translate} = this.props;
        switch(code) {
            case 401:
                return (<div>{translate('err_your_email_is_not_activated_yet')}</div>)
            case 404:
                return (<div>{translate('err_user_wasnt_registered_yet')}</div>)
            case 422:
                return (<div>{translate('err_email_password_not_corresponding')}</div>)
            default:
                return (<div>{translate('err_some_problems_appeared')}</div>)
        }
    }

    onChange(event) {
        const field = event.target.name;
        const credentials = this.state.credentials;
        credentials[field] = event.target.value;

        return this.setState({ credentials: credentials });
    }

    onSave(event) {
        event.preventDefault();
        this.props.actions.doLogin(this.state.credentials);
    }

    render() {

        const { errors, translate } = this.props;

        return (
            <div>
                <form role="form" className="card login-form" action="/api/user/authorization" method="POST">
                    <div className={ "card-header " + (this.props.httpCode ? 'alert-danger' : '')}>
                        {(this.props.httpCode ? this.pickErrorMessage(this.props.httpCode) : translate("enter_your_credentials") )}
                    </div>
                    <div className="card-block">
                        <TextInput
                            name="email"
                            label={translate('email')}
                            value={ this.state.credentials.email }
                            error={ errors.email }
                            onChange={ this.onChange }/>

                        <TextInput
                            name="password"
                            label={translate('password')}
                            type="password"
                            value={ this.state.credentials.password }
                            error={ errors.password }
                            onChange={ this.onChange }/>
                    </div>

                    <div className="card-footer">
                        <div className="row">
                            <div className="text-right col-6">
                                <button
                                    className="btn btn-primary"
                                    onClick={ this.onSave }>
                                    {translate('login')}
                                </button>
                            </div>
                            <div className="col-6 text-right">
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    this.setState({forgotModalIsOpen: true});
                                }}>{translate('forgot_password')}</a>
                            </div>
                        </div>
                    </div>
                </form>
                <PasswordForgotModal isOpen={this.state.forgotModalIsOpen} onClosed={() => this.state.forgotModalIsOpen = false }/>
            </div>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect((state) => ({
    errors: state.user.login.errors,
    httpCode: state.user.login.httpStatus,
    translate: getTranslate(state.locale)
}), mapDispatchToProps)(Form);
