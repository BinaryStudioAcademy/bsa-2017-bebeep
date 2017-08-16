import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import Input from '../../../../app/components/Input';
import Textarea from '../../../../app/components/Textarea';
import StatusModal from '../_Modals/StatusModal';

import { updateProfileSuccess } from '../../actions';

import UserService from '../../services/UserService';
import { ProfileValidate } from '../../../../app/services/UserService';

const MODAL_MSG = {
    success: 'User profile general data successfully updated!',
    error: 'Failed to update the user profile general data! Check the validation!',
};

class GeneralForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            profile: {},
            profileNotFound: false,
            errors: {},
            modal: {
                isOpen: false,
                status: '',
                msg: '',
            },
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
    }

    componentDidMount() {
        UserService.getProfileGeneral()
            .then(response => {
                this.setState({
                    profile: response.data,
                });
            })
            .catch(error => {
                this.setState({
                    profileNotFound: true,
                });
            });
    }

    handleRoleChange(e) {
        const roleCheck = e.target;

        if (!this.state.profile['can_uncheck_' + roleCheck.name]) {
            roleCheck.checked = !roleCheck.checked;
            return;
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const { updateProfileSuccess } = this.props;

        const profileData = {
            first_name: form.first_name.value,
            last_name: form.last_name.value,
            email: form.email.value,
            phone: form.phone.value,
            birth_date: form.birth_date.value,
            role_driver: form.role_driver.checked,
            role_passenger: form.role_passenger.checked,
            about_me: form.about_me.value,
        };

        const validate = ProfileValidate(profileData);
        if (!validate.valid) {
            this.setState({
                errors: validate.errors
            });
            return;
        }

        this.setState({
            errors: {}
        });

        UserService.updateProfileGeneral(profileData)
            .then(response => {
                this.setState({
                    modal: {
                        isOpen: true,
                        status: 'success',
                        msg: MODAL_MSG.success,
                    }
                });
                // TODO :: updateProfileSuccess method will change the user name
                // in the main navigation dropdown
                updateProfileSuccess();
            })
            .catch(error => {
                this.setState({
                    errors: error,
                    modal: {
                        isOpen: true,
                        status: 'error',
                        msg: MODAL_MSG.error,
                    }
                });
            });
    }

    render() {
        const { profile, errors, profileNotFound, modal } = this.state;

        if (profileNotFound) {
            return (
                <div className="alert alert-danger" role="alert">Profile data not found!</div>
            );
        }
        if (_.isEmpty(profile)) {
            return (<div></div>);
        }

        return (
            <div>
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
                            defaultValue={ profile.first_name }
                            required={ false }
                            error={ errors.first_name }
                        >First name</Input>
                        <Input
                            type="text"
                            name="last_name"
                            id="last_name"
                            defaultValue={ profile.last_name }
                            required={ false }
                            error={ errors.last_name }
                        >Last name</Input>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            defaultValue={ profile.email }
                            required={ false }
                            error={ errors.email }
                        >E-mail</Input>
                        <Input
                            type="tel"
                            name="phone"
                            id="phone"
                            defaultValue={ profile.phone }
                            required={ false }
                            error={ errors.phone }
                        >Phone number</Input>
                        <Input
                            type="date"
                            name="birth_date"
                            id="birth_date"
                            defaultValue={ profile.birth_date }
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
                                           defaultChecked={ profile.role_driver }
                                           onChange={ this.handleRoleChange }
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
                                           defaultChecked={ profile.role_passenger }
                                           onChange={ this.handleRoleChange }
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
                            defaultValue={ profile.about_me || '' }
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

                <StatusModal modal={ modal } isOpen={ modal.isOpen }
                    onClosed={ () => this.state.modal.isOpen = false }/>
            </div>
        )
    }
}

const GeneralFormConnected = connect(
    null,
    (dispatch) =>
        bindActionCreators({ updateProfileSuccess }, dispatch)
)(GeneralForm);

export default GeneralFormConnected;
