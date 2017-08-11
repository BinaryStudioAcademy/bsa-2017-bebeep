import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { getProfile, editProfile } from '../../actions';

import Input from '../../../../app/components/Input';
import Textarea from '../../../../app/components/Textarea';

class GeneralForm extends Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);

        /*
        const PASSENGER_PERMISSION = 1;
        const DRIVER_PERMISSION = 2;
        const ADMIN_PERMISSION = 4;
        */
    }

    componentDidMount() {
        this.props.getProfile();
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.editProfile({
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            birth_date: e.target.birth_date.value,
            role_driver: e.target.role_driver.checked,
            role_passenger: e.target.role_passenger.checked,
            about_me: e.target.about_me.value,
        });
    }

    render() {
        const { profile, errors } = this.props;

        return (_.isEmpty(profile) ? <div></div> :

            <form role="form" className="card profile-form" action="/api/user/profile/edit" method="POST"
                  onSubmit={ this.onSubmit }>
                <div className="card-block">
                    <Input
                        type="text"
                        name="first_name"
                        id="first_name"
                        value={ profile.first_name }
                        required={ false }
                        error={ errors.first_name }
                    >First name</Input>
                    <Input
                        type="text"
                        name="last_name"
                        id="last_name"
                        value={ profile.last_name }
                        required={ false }
                        error={ errors.last_name }
                    >Last name</Input>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        value={ profile.email }
                        required={ false }
                        error={ errors.email }
                    >E-mail</Input>
                    <Input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={ profile.phone }
                        required={ false }
                        error={ errors.phone }
                    >Phone number</Input>
                    <Input
                        type="date"
                        name="birth_date"
                        id="birth_date"
                        value={ profile.birth_date.substr(0, 10) }
                        required={ false }
                        error={ errors.birth_date }
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

                    <Textarea
                        name="about_me"
                        id="about_me"
                        value={ profile.about_me }
                        required={ false }
                        error={ errors.about_me }
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

const GeneralFormConnected = connect(
    (state) => ({
        profile: state.user.profile.data,
        errors: state.user.profile.errors
    }),
    (dispatch) =>
        bindActionCreators({ getProfile, editProfile }, dispatch)
)(GeneralForm);

export default GeneralFormConnected;
