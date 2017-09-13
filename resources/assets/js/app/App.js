import React from 'react';

import MainHeader from './components/MainHeader';
import Notifications from './components/Notifications';
import GeneralChannel from 'features/chat/components/GeneralChannel';
import {getUserId, isAuthorized} from 'app/services/AuthService';

import './bootstrap/bootstrap.scss';
import './bootstrap/font-awesome.scss';
import './styles/app.scss';

class App extends React.Component {

    render() {

        return (
            <div id="application">
                <MainHeader />
                <Notifications userId={getUserId()} />
                <GeneralChannel isAuthorized={isAuthorized()} />
                { this.props.children }
            </div>
        )
    }
}

export default App;
