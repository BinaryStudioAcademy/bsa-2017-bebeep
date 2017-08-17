import React, { Component } from 'react';

import MainHeader from './components/MainHeader';

import './bootstrap/bootstrap.scss';
import './styles/app.scss';

class App extends Component {

    render() {
        return (
            <div id="application">
                <MainHeader />

                <div className="main-container container py-4">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default App;
