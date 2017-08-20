import React from 'react';

import PageHeader from 'app/components/PageHeader';
import CreateTripContainer from '../components/Containers/CreateTripContainer';

import '../styles/create_trip.scss';

export default class CreateTrip extends React.Component {
    render() {
        return (
            <div>
                <PageHeader header={ 'Create new trip' }/>
                <CreateTripContainer />
            </div>
        );
    }
}
