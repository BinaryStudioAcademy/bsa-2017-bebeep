import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Input from './Input';

class User extends Component {

    render() {
        const user = this.props.user;

        return (
            <div className="login-form-container">
                <form className="card login-form" method="POST" action="/api/user/authenticate">
                    <div className="card-header">
                        Enter your credentials
                    </div>
                    <div className="card-block">
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            required={true}
                            onChange={ (e) => setField(e.target.name, e.target.value) }
                        >E-mail</Input>

                        <Input
                            type="password"
                            name="password"
                            id="password"
                            required={true}
                            onChange={ (e) => setField(e.target.name, e.target.value) }
                        >Password</Input>

                        <div className="card-footer">
                            <div className="col-md-8 offset-sm-4">
                                <button className="btn btn-primary">
                                    Login
                                </button>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        );
    }
}

User.propTypes = {
    user: PropTypes.object
};

export default User;
