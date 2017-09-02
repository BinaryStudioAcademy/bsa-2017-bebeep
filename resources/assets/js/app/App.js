import React from 'react';

import MainHeader from './components/MainHeader';

import './bootstrap/bootstrap.scss';
import './bootstrap/font-awesome.scss';
import './styles/app.scss';

class App extends React.Component {

    render() {

        return (
            <div id="application">
                <MainHeader />

                { this.props.children }
            </div>
        )
    }
}

export default App;
