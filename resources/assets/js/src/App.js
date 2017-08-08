import React, { Component } from 'react';
import MainNavigation from './pages/partials/MainNavigation';

import './styles/App.scss';

class App extends Component {

    render() {
        return (
            <div id="application">
                <MainNavigation />

                {this.props.children}
            </div>
        )
    }
}

export default App;
