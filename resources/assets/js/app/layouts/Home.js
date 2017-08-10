import React, { Component } from 'react';

import PageHeader from '../components/PageHeader';

import '../styles/home.scss';
import carpoolImage from '../images/carpool.jpg';

class Home extends Component {

    render() {
        return (
            <div>
                <PageHeader header={ 'BeBeep Carpool Service' } />

                <p className="bebeep-home-slogan">Travel with the great pleasure!</p>

                <figure className="bebeep-home-img">
                    <img src={ carpoolImage } alt="BeBeep Carpool Service"/>
                </figure>
            </div>
        )
    }
}

export default Home;
