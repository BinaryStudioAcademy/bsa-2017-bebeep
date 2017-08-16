import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Input from '../../../../app/components/Input';

class PasswordForm extends Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        /*this.props.changePassword({
            current_password: e.target.current_password.value,
            password: e.target.password.value,
            password_confirmation: e.target.password_confirmation.value
        });*/
    }

    render() {
        const { errors } = this.props;

        return (
            <form role="form" className="card profile-form"
                  method="POST" action="/api/user/password/change"
                  onSubmit={ this.onSubmit }>
                <div className="card-block">
                    <Input
                        type="password"
                        name="current_password"
                        id="current_password"
                        required={false}
                        error={errors.current_password}
                    >Current password</Input>

                    <Input
                        type="password"
                        name="password"
                        id="password"
                        required={false}
                        error={errors.password}
                    >New password</Input>

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
                            Save
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default PasswordForm;
