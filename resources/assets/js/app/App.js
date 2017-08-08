import React, { Component } from 'react';

import MainHeader from './views/partials/MainHeader';

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
