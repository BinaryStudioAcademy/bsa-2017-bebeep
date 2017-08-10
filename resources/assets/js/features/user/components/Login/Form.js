import React from 'react';
import { connect } from 'react-redux';
import { doLogin } from '../../actions';
import Input from './Input';
import { browserHistory } from 'react-router';

class Form extends React.Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.successLogin) {
            browserHistory.push('/register/success');
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.dispatch(doLogin({
            email: e.target['email'].value,
            password: e.target['password'].value,
        }));
    }

    render() {
        const { errors } = this.props;

        return (
            <form role="form" className="card login-form" action="/api/user/authenticate" method="POST"
                  onSubmit={ this.onSubmit }>
                <div className="card-header">
                    Enter your credentials
                </div>
                <div className="card-block">
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        required={true}
                        error={ errors.email }
                    >E-mail</Input>

                    <Input
                        type="password"
                        name="password"
                        id="password"
                        required={true}
                        error={ errors.password }
                    >Password</Input>
                </div>

                <div className="card-footer">
                    <div className="text-center">
                        <button className="btn btn-primary">
                            Login
                        </button>
                    </div>
                </div>
            </form>
        );
    }

}

const FormConnected = connect(
    (state) => ({
        errors: state.user.login.errors,
        successLogin: state.user.login.success
    })
)(Form);

export default FormConnected;
