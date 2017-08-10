import React, { Component } from 'react';

import MainHeader from 'app/components/MainHeader';

import 'app/bootstrap/bootstrap.scss';
import 'app/styles/app.scss';

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
