import React, { Component } from 'react';

import PageHeader from 'app/components/PageHeader';
import Logout from 'features/user/components/Login/Logout';

import 'features/user/styles/user.scss';

class LogoutLayout extends Component {

    render() {
        return (
            <div>
                <PageHeader header={ 'Logout' } />
                <Logout />
            </div>
        )
    }
}

export default LogoutLayout;
