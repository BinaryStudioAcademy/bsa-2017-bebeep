import React from 'react';

import Preloader from './components/Preloader';
import MainHeader from './components/MainHeader';
import MainFooter from './components/MainFooter';
import Notifications from './components/Notifications';

import AuthService from './services/AuthService';

import './bootstrap/bootstrap.scss';
import './bootstrap/font-awesome.scss';
import './styles/app.scss';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isShowContent: false,
        }

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
            </div>;
    }

    render() {
        return (
            <div id="application" className="main-application">
                <MainHeader />
                { this.renderComponent() }
                <MainFooter />
            </div>
        )
    }
}

export default App;
