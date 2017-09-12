import React from 'react';

import MainHeader from './components/MainHeader';
import Notifications from './components/Notifications';
import GeneralChannel from 'features/chat/components/GeneralChannel';
import {getUserId} from 'app/services/AuthService';

import './bootstrap/bootstrap.scss';
import './bootstrap/font-awesome.scss';
import './styles/app.scss';

class App extends React.Component {

    render() {

        return (
            <div id="application">
                <MainHeader />
                <Notifications userId={getUserId()} />
                <GeneralChannel />
                { this.props.children }
            </div>
        )
    }
}

export default App;
