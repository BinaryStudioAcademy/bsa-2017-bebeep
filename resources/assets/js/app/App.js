import React from 'react';

import MainHeader from './components/MainHeader';
import Preloader from './components/Preloader';

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
        if (AuthService.isAuthorized() || ! AuthService.isSessionTokenValid()) {
            this.setShowContent();
            return;
        }

        AuthService.getSessionDataFromServer(
            this.setShowContent,
            this.setShowContent
        );
    }

    setShowContent() {
        this.setState({
            isShowContent: true,
        });
    }

    renderComponent() {
        return !this.state.isShowContent
            ? <Preloader enable={true} />
            : this.props.children;
    }

    render() {
        return (
            <div id="application">
                <MainHeader />

                { this.renderComponent() }
            </div>
        )
    }
}

export default App;
