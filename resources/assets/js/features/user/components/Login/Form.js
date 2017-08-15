import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TextInput from './TextInput';
import PasswordForgotModal from '../PasswordForgotModal';

import * as actions from 'features/user/actions';

import 'features/user/styles/user.scss';

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = { credentials: { email: '', password: '' }, forgotModalIsOpen: false };
        this.onChange = this.onChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.pickErrorMessage = this.pickErrorMessage.bind(this);
    }

    pickErrorMessage(code) {
        switch(code) {
            case 401:
                return (<div>Your e-mail was not activated yet. <a href="/verification">Click to proceed with verification</a></div>)
            case 404:
                return (<div>User with such e-mail wasn't registered yet. <a href="/registration"> Goto to registration page </a></div>)
            case 422:
                return (<div>E-mail and password are not corressponding each other</div>)
            default:
                return (<div>Some problems appeared. Try once more in a moment</div>)
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

        const { errors, errorMessage } = this.props;

        return (
            <div>
                <form role="form" className="card login-form" action="/api/user/authorization" method="POST">
                    <div className={ "card-header " + (this.props.httpCode ? 'alert-danger' : '')}>
                        {(this.props.httpCode ? this.pickErrorMessage(this.props.httpCode) : "Enter your credentials" )}
                    </div>
                    <div className="card-block">
                        <TextInput
                            name="email"
                            label="Email"
                            value={ this.state.credentials.email }
                            error={ errors.email }
                            onChange={ this.onChange }/>

                        <TextInput
                            name="password"
                            label="Password"
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
                                    Login
                                </button>
                            </div>
                            <div className="col-6 text-right">
                                <a href="#" onClick={(e) => {
                                    e.preventDefault();
                                    this.setState({forgotModalIsOpen: true});
                                }}>Forgot password ?</a>
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
    httpCode: state.user.login.httpStatus
}), mapDispatchToProps)(Form);
