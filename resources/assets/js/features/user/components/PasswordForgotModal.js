import React from 'react';
import Input from '../../../app/components/Input';
import Modal from '../../../app/components/Modal';
import { makeRequest } from '../../../app/services/RequestService';
import validate from 'validate.js';
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
        const email = e.target['email'].value,
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
        this.setState({formIsOpen: newProps.isOpen});
    }

    render() {
        const {errors, formIsOpen, alertIsOpen} = this.state;
        return (
            <div>
                <Modal isOpen={formIsOpen}>
                    <form method="post" action="/api/password/forgot" className="password-form" onSubmit={this.onSubmit}>
                        <div className="modal-header">Enter your email address and we will send you a link to reset your password.</div>
                        <div className="modal-body">
                            <Input
                                name="email"
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
                <Modal isOpen={alertIsOpen}>
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
