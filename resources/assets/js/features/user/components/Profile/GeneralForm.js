import React from 'react';
import { localize } from 'react-localize-redux';

import Input from 'app/components/Input';
import Textarea from 'app/components/Textarea';
import StatusModal from '../_Modals/StatusModal';

import { ProfileValidate } from 'app/services/UserService';
import UserService from 'features/user/services/UserService';

const MODAL_MSG = {
    success: 'profile_general.user_profile_general_success',
    error: 'profile_general.failed_update_user_profile_general_data',
};

class GeneralForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
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

    handleRoleChange(e) {
        const profile = this.props.profile,
            roleCheck = e.target;

        if (!profile['can_uncheck_' + roleCheck.name]) {
            roleCheck.checked = !roleCheck.checked;
            return;
        }
    }

    checkValidation(data) {
        const validate = ProfileValidate(data);

        if (!validate.valid) {
            this.setState({
                errors: validate.errors
            });

            return false;
        }

        this.setState({ errors: {} });

        return true;
    }

    updateProfileGeneral(data) {
        const { updateProfileSuccess, translate } = this.props;

        UserService.updateProfileGeneral(data)
            .then(response => {
                this.setState({
                    modal: {
                        isOpen: true,
                        status: 'success',
                        msg: translate(MODAL_MSG.success),
                    }
                });
                updateProfileSuccess(response.data);
            })
            .catch(error => {
                this.setState({
                    errors: error,
                    modal: {
                        isOpen: true,
                        status: 'error',
                        msg: translate(MODAL_MSG.error),
                    }
                });
            });
    }

    onSubmit(e) {
        e.preventDefault();

        const form = e.target,
            data = {
                first_name: form.first_name.value,
                last_name: form.last_name.value,
                email: form.email.value,
                phone: form.phone.value,
                birth_date: form.birth_date.value,
                role_driver: form.role_driver.checked,
                role_passenger: form.role_passenger.checked,
                about_me: form.about_me.value,
            };

        if (!this.checkValidation(data)) {
            return;
        }

        this.updateProfileGeneral(data);
    }

    render() {
        const { errors, modal } = this.state,
            { profile, translate } = this.props;

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
                        >{translate('profile_general.first_name')}</Input>
                        <Input
                            type="text"
                            name="last_name"
                            id="last_name"
                            defaultValue={ profile.last_name }
                            required={ false }
                            error={ errors.last_name }
                        >{translate('profile_general.last_name')}</Input>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            defaultValue={ profile.email }
                            required={ false }
                            error={ errors.email }
                        >{translate('profile_general.email')}</Input>
                        <Input
                            type="tel"
                            name="phone"
                            id="phone"
                            defaultValue={ profile.phone }
                            required={ false }
                            error={ errors.phone }
                        >{translate('profile_general.phone')}</Input>
                        <Input
                            type="date"
                            name="birth_date"
                            id="birth_date"
                            defaultValue={ profile.birth_date }
                            required={ false }
                            error={ errors.birth_date }
                        >{translate('profile_general.birth_date')}</Input>

                        <div className={ "form-group row " + (errors.role ? 'has-danger' : '') }>
                            <div className="col-sm-4">
                                {translate('profile_general.role')}
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
                                    /> {translate('profile_general.driver')}
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
                                    /> {translate('profile_general.passenger')}
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
                        >{translate('profile_general.about_me')}</Textarea>
                    </div>

                    <div className="card-footer">
                        <div className="text-center">
                            <button className="btn btn-primary">
                                {translate('profile_general.save')}
                            </button>
                        </div>
                    </div>
                </form>

                <StatusModal modal={ modal } isOpen={ modal.isOpen }
                    onClosed={ () => this.state.modal.isOpen = false } />
            </div>
        )
    }
}

export default localize(GeneralForm, 'locale');
