import React from 'react';
import validate from 'validate.js';

import Input from 'app/components/Input';
import Modal from 'app/components/Modal';
import { makeRequest } from 'app/services/RequestService';

import '../styles/password_forgot.scss';

class PasswordForgotModal extends React.Component {
    constructor() {
        super();
        this.state = {
            formIsOpen: false,
            alertIsOpen: false,
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const email = e.target['forgotten_email'].value,
            error = validate.single(email, {presence: true, email: true});
        if (error) {
            this.setState({
                errors: { email: error.join(', ') }
            });
        } else {
            makeRequest('post', '/api/v1/password-resets', {
                email: email
            }).then(
                response => this.setState({
                    alertIsOpen: true,
                    formIsOpen: false,
                    errors: {}
                }),
                error => this.setState({
                    errors: error.response.data
                })
            );
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.state.formIsOpen !== newProps.isOpen) {
            this.setState({formIsOpen: newProps.isOpen});
        }
    }

    render() {
        const {errors, formIsOpen, alertIsOpen} = this.state;
        const onClosed = this.props.onClosed || (() => {});
        return (
            <div>
                <Modal isOpen={formIsOpen} onClosed={() => { this.state.formIsOpen = false; onClosed(); }}>
                    <form method="post" action="/api/password/forgot" className="password-form" onSubmit={this.onSubmit} autoComplete="false">
                        <div className="modal-header">Enter your email address and we will send you a link to reset your password.</div>
                        <div className="modal-body">
                            <Input
                                name="forgotten_email"
                                type="email"
                                id="email"
                                error={errors.email}
                            >E-mail</Input>
                        </div>
                        <div className="modal-footer text-right">
                            <button className="btn" onClick={(e) => {
                                e.preventDefault();
                                this.setState({formIsOpen: false});
                            }}>Cancel</button>
                            <button className="btn btn-primary" role="button">Send password reset email</button>
                        </div>
                    </form>
                </Modal>
                <Modal isOpen={alertIsOpen} onClosed={() => { this.state.alertIsOpen = false; onClosed(); }}>
                    <div className={"alert alert-success password-alert-success"}>
                        <button type="button" className="close" onClick={(e) => {
                            e.preventDefault();
                            this.setState({alertIsOpen: false});
                        }}>
                            <span>&times;</span>
                        </button>
                        Link to reset password send to your email
                    </div>
                </Modal>
            </div>
        )
    }
}

export default PasswordForgotModal;
