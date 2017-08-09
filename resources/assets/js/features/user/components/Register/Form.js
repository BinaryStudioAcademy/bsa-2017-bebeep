import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setField, doRegister } from '../../actions';
import Input from './Input'

class Form extends React.Component {

    render() {
        const {setField, doRegister, errors} = this.props;
        return (
            <form role="form" className="card register-form" action="/api/user/register" method="POST"
                  onSubmit={(e) => {
                      e.preventDefault();
                      doRegister();
                  }}>
                <div className="card-header">
                    Enter your credentials
                </div>
                <div className="card-block">
                    <Input
                        type="text"
                        name="first_name"
                        id="first_name"
                        required={true}
                        onChange={ (e) => setField(e.target.name, e.target.value) }
                        error={errors.first_name}
                    >First name</Input>
                    <Input
                        type="text"
                        name="last_name"
                        id="last_name"
                        required={true}
                        onChange={ (e) => setField(e.target.name, e.target.value) }
                        error={errors.last_name}
                    >Last name</Input>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        required={true}
                        onChange={ (e) => setField(e.target.name, e.target.value) }
                        error={errors.email}
                    >E-mail</Input>
                    <Input
                        type="tel"
                        name="phone"
                        id="phone"
                        required={true}
                        onChange={ (e) => setField(e.target.name, e.target.value) }
                    >Phone number</Input>
                    <Input
                        type="date"
                        name="birth_date"
                        id="birth_date"
                        required={true}
                        onChange={ (e) => setField(e.target.name, e.target.value) }
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
                                       onChange={ (e) => setField(e.target.name, e.target.checked) }
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
                                       onChange={ (e) => setField(e.target.name, e.target.checked) }
                                /> passenger
                            </label>
                        </div>
                    </div>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        required={true}
                        onChange={ (e) => setField(e.target.name, e.target.value) }
                        error={errors.password}
                    >Password</Input>
                    <Input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        required={true}
                        onChange={ (e) => setField(e.target.name, e.target.value) }
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
    }),
    (dispatch) =>
        bindActionCreators({ setField, doRegister }, dispatch)
)(Form);

export default FormConnected;