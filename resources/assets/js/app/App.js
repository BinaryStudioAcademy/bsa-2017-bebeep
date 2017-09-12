import React from 'react';

import MainHeader from './components/MainHeader';
import MainFooter from './components/MainFooter';
import Notifications from './components/Notifications';
import {getUserId} from 'app/services/AuthService';

import './bootstrap/bootstrap.scss';
import './bootstrap/font-awesome.scss';
import './styles/app.scss';

class App extends React.Component {

    render() {

        return (
            <div id="application" className="main-application">
                <MainHeader />

                <Notifications userId={getUserId()} />
                { this.props.children }

                <MainFooter />
            </div>
        )
    }
}

export default App;
