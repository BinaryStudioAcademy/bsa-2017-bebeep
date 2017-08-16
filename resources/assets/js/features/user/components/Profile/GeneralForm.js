import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { getProfile, editProfile, changeRole } from '../../actions';

import Input from '../../../../app/components/Input';
import Textarea from '../../../../app/components/Textarea';

import UserService from '../../services/UserService';

import { RegisterValidator } from '../../../../app/services/UserService';

class GeneralForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            profile: {},
            isValid: true,
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        UserService.getProfileGeneral()
            .then(response => {
                this.setState({
                    profile: response.data,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        if ((name === 'role_driver' ||
            name === 'role_passenger') &&
            !this.state.profile['can_uncheck_' + name]
        ) {
            e.target.checked = !e.target.checked;
            return;
        }

        const validate = RegisterValidator[name](value);
        this.setState({
            ...this.state.errors,
            isValid: validate.valid,
            errors: {
                [name]: validate.error
            }
        });

        this.setState({
            profile: {
                ...this.state.profile,
                [name]: value,
            }
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const profileData = {
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            birth_date: e.target.birth_date.value,
            role_driver: e.target.role_driver.checked,
            role_passenger: e.target.role_passenger.checked,
            about_me: e.target.about_me.value,
        };
    }

    render() {
        const { profile, errors } = this.state;

        if (_.isEmpty(profile)) {
            return (<div></div>);
        }

        console.log(this.state);

        return (
            <form role="form" className="card profile-form"
                  method="POST"
                  action="/api/user/profile"
                  onSubmit={ this.onSubmit }
            >
                <div className="card-block">
                    <Input
                        type="text"
                        name="first_name"
                        id="first_name"
                        value={ profile.first_name }
                        required={ false }
                        error={ errors.first_name }
                        onChange={ this.handleChange }
                    >First name</Input>
                    <Input
                        type="text"
                        name="last_name"
                        id="last_name"
                        value={ profile.last_name }
                        required={ false }
                        error={ errors.last_name }
                        onChange={ this.handleChange }
                    >Last name</Input>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        value={ profile.email }
                        required={ false }
                        error={ errors.email }
                        onChange={ this.handleChange }
                    >E-mail</Input>
                    <Input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={ profile.phone }
                        required={ false }
                        error={ errors.phone }
                        onChange={ this.handleChange }
                    >Phone number</Input>
                    <Input
                        type="date"
                        name="birth_date"
                        id="birth_date"
                        value={ profile.birth_date }
                        required={ false }
                        error={ errors.birth_date }
                        onChange={ this.handleChange }
                    >Birth date</Input>

                    <div className={ "form-group row " + (errors.role ? 'has-danger' : '') }>
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
                                       checked={ profile.role_driver }
                                       onChange={ this.handleChange }
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
                                       checked={ profile.role_passenger }
                                       onChange={ this.handleChange }
                                /> passenger
                            </label>
                        </div>
                        <div className="offset-sm-4 col-sm-8">
                            <div className="form-control-feedback">{ errors.role }</div>
                        </div>
                    </div>

                    <Textarea
                        name="about_me"
                        id="about_me"
                        value={ profile.about_me || '' }
                        required={ false }
                        error={ errors.about_me }
                        onChange={ this.handleChange }
                    >About me</Textarea>
                </div>

                <div className="card-footer">
                    <div className="text-center">
                        <button className="btn btn-primary">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

/*const GeneralFormConnected = connect(
    (state) => ({
        profile: state.user.profile.data,
        errors: state.user.profile.errors
    }),
    (dispatch) =>
        bindActionCreators({ getProfile, editProfile, changeRole }, dispatch)
)(GeneralForm);*/

//export default GeneralFormConnected;
export default GeneralForm;
