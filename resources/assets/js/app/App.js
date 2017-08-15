import React, { Component } from 'react';

import MainHeader from './components/MainHeader';

import './bootstrap/bootstrap.scss';
import './bootstrap/font-awesome.scss';
import './styles/app.scss';

class App extends Component {

    render() {
        return (
            <div id="application">
                <MainHeader />

                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default App;
