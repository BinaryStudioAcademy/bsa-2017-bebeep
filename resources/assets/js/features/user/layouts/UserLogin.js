import React, { Component } from 'react';

import PageHeader from '../../../app/components/PageHeader';
import UserLoginForm from '../components/Login/UserLoginForm';

import '../styles/user.scss';

class UserLogin extends Component {

    render() {
        return (
            <div>
                <PageHeader header={ 'Login' } />
                <UserLoginForm />
            </div>
        )
    }
}

export default UserLogin;
