import React, { Component } from 'react';
import {localize} from 'react-localize-redux';

import Input from '../../../../app/components/Input';
import StatusModal from '../_Modals/StatusModal';

import UserService from '../../services/UserService';
import { PasswordUpdateValidate } from '../../../../app/services/UserService';

const MODAL_MSG = {
    success: 'user_profile_password_success_updated',
    error: 'failed_update_user_profile_password',
};

class PasswordForm extends Component {

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
    }

    onSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const { updateProfilePassword, translate } = this.props;

        const updatedData = {
            current_password: form.current_password.value,
            password: form.password.value,
            password_confirmation: form.password_confirmation.value
        };

        const validate = PasswordUpdateValidate(updatedData);
        if (!validate.valid) {
            this.setState({
                errors: validate.errors
            });
            return;
        }

        this.setState({
            errors: {}
        });

        UserService.updateProfilePassword(updatedData)
            .then(response => {
                form.reset();
                this.setState({
                    modal: {
                        isOpen: true,
                        status: 'success',
                        msg: translate(MODAL_MSG.success),
                    }
                });
            })
            .catch(error => {
                form.reset();
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

    render() {
        const { errors, modal } = this.state,
            {translate} = this.props;

        return (
            <div>
                <form role="form" className="card password-update-form"
                      method="POST" action="/api/user/profile/password"
                      onSubmit={ this.onSubmit }>
                    <div className="card-block">
                        <Input
                            type="password"
                            name="current_password"
                            id="current_password"
                            required={false}
                            error={errors.current_password}
                        >{translate('current_password')}</Input>

                        <Input
                            type="password"
                            name="password"
                            id="password"
                            required={false}
                            error={errors.password}
                        >{translate('new_password')}</Input>

                        <Input
                            type="password"
                            name="password_confirmation"
                            id="password_confirmation"
                            required={false}
                            error={errors.password_confirmation}
                        >{translate('repeat_password')}</Input>
                    </div>

                    <div className="card-footer">
                        <div className="text-center">
                            <button className="btn btn-primary">
                                {translate('save_password')}
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

export default localize(PasswordForm, 'locale');
