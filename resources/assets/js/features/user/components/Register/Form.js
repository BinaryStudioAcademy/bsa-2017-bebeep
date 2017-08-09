import React from 'react';
import { connect } from 'react-redux';
import { doRegister } from '../../actions';
import Input from './Input'

class Form extends React.Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.dispatch(doRegister({
            first_name: e.target['first_name'].value,
            last_name: e.target['last_name'].value,
            phone: e.target['phone'].value,
            email: e.target['email'].value,
            birth_date: e.target['birth_date'].value,
            role_driver: e.target['role_driver'].checked,
            role_passenger: e.target['role_passenger'].checked,
            password: e.target['password'].value,
            password_confirmation: e.target['password_confirmation'].value
        }));
    }

    render() {
        const {errors} = this.props;
        return (
            <form role="form" className="card register-form" action="/api/user/register" method="POST"
                  onSubmit={this.onSubmit}>
                <div className="card-header">
                    Enter your credentials
                </div>
                <div className="card-block">
                    <Input
                        type="text"
                        name="first_name"
                        id="first_name"
                        required={true}
                        error={errors.first_name}
                    >First name</Input>
                    <Input
                        type="text"
                        name="last_name"
                        id="last_name"
                        required={true}
                        error={errors.last_name}
                    >Last name</Input>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        required={true}
                        error={errors.email}
                    >E-mail</Input>
                    <Input
                        type="tel"
                        name="phone"
                        id="phone"
                        required={true}
                        error={errors.phone}
                    >Phone number</Input>
                    <Input
                        type="date"
                        name="birth_date"
                        id="birth_date"
                        required={true}
                        error={errors.birth_date}
                    >Birth date</Input>
                    <div className="form-group row">
                        <div className="col-sm-4">
                            Role
                        </div>
                        <div className="form-check col-sm-4">
                            <label className="form-check-label">
                                <input className="form-check-input"
                                       type="checkbox"
                                       id="role_driver"
                                       name="role_driver"
                                       value="1"
                                /> driver
                            </label>
                        </div>
                        <div className="form-check col-sm-4">
                            <label className="form-check-label">
                                <input className="form-check-input"
                                       type="checkbox"
                                       id="role_passenger"
                                       name="role_passenger"
                                       value="1"
                                /> passenger
                            </label>
                        </div>
                    </div>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        required={true}
                        error={errors.password}
                    >Password</Input>
                    <Input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        required={true}
                    >Repeat password</Input>
                </div>

                <div className="card-footer">
                    <div className="col-md-8 offset-sm-4">
                        <button className="btn btn-primary">
                            Register
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

const FormConnected = connect(
    (state) => ({
        errors: state.user.register.errors
    })
)(Form);

export default FormConnected;