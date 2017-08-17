import React, { Component } from 'react';

import PageHeader from 'app/components/PageHeader';
import CreateTripContainer from '../components/Create/CreateTripContainer';

import '../styles/create_trip.scss';

export default class CreateTrip extends Component {
    render() {
        return (
            <div>
                <PageHeader header={ 'Create new trip' }/>
                <CreateTripContainer />
            </div>
        );
    }
}
