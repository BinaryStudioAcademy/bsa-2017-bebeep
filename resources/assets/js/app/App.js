import React from 'react';

import Preloader from './components/Preloader';
import MainHeader from './components/MainHeader';
import Notifications from './components/Notifications';
import GeneralChannel from 'features/chat/components/GeneralChannel';
import {getUserId, isAuthorized} from 'app/services/AuthService';

import AuthService from './services/AuthService';

import './bootstrap/bootstrap.scss';
import './bootstrap/font-awesome.scss';
import './styles/app.scss';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isShowContent: false,
        };

        this.setShowContent = this.setShowContent.bind(this);
    }

    componentWillMount() {
        if (AuthService.isAuthorized() || !AuthService.isSessionTokenValid()) {
            this.setShowContent();
            return;
        }

        AuthService.getSessionDataFromServer(this.setShowContent);
    }

    setShowContent() {
        this.setState({
            isShowContent: true,
        });
    }

    renderComponent() {
        return !this.state.isShowContent
            ? <Preloader enable={true} />
            : <div>
                {this.props.children}
                <Notifications userId={AuthService.getUserId()} />
                <GeneralChannel isAuthorized={AuthService.isAuthorized()} />
            </div>;
    }

    render() {
        return (
            <div id="application">
                <MainHeader />
                { this.props.children }
                { this.renderComponent() }
            </div>
        )
    }
}

export default App;
