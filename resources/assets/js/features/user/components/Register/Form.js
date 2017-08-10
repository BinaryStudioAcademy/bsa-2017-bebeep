import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { doRegister } from '../../actions';
import Input from '../../../../app/components/Input';
import { browserHistory } from 'react-router';
import '../../styles/user_register.scss';

class Form extends React.Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.doRegister({
            first_name: e.target['first_name'].value,
            last_name: e.target['last_name'].value,
            phone: e.target['phone'].value,
            email: e.target['email'].value,
            birth_date: e.target['birth_date'].value,
            role_driver: e.target['role_driver'].checked,
            role_passenger: e.target['role_passenger'].checked,
            password: e.target['password'].value,
            password_confirmation: e.target['password_confirmation'].value
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.successRegister) {
            browserHistory.push('/registration/success');
        }
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
                        required={false}
                        error={errors.first_name}
                    >First name</Input>
                    <Input
                        type="text"
                        name="last_name"
                        id="last_name"
                        required={false}
                        error={errors.last_name}
                    >Last name</Input>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        required={false}
                        error={errors.email}
                    >E-mail</Input>
                    <Input
                        type="tel"
                        name="phone"
                        id="phone"
                        required={false}
                        error={errors.phone}
                    >Phone number</Input>
                    <Input
                        type="date"
                        name="birth_date"
                        id="birth_date"
                        required={false}
                        error={errors.birth_date}
                    >Birth date</Input>
                    <div className={"form-group row " + (errors.role ? 'has-danger' : '')}>
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
                        <div className="offset-sm-4 col-sm-8">
                            <div className="form-control-feedback">{ errors.role }</div>
                        </div>
                    </div>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        required={false}
                        error={errors.password}
                    >Password</Input>
                    <Input
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        required={false}
                        error={errors.password_confirmation}
                    >Repeat password</Input>
                </div>

                <div className="card-footer">
                    <div className="text-center">
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
        errors: state.user.register.errors,
        successRegister: state.user.register.success,
    }),
    (dispatch) =>
        bindActionCreators({doRegister}, dispatch)
)(Form);

export default FormConnected;