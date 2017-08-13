import React, { Component } from 'react';
import MapModal from '../components/MapModal';
import PageHeader from '../../../app/components/PageHeader';
import ListWithTripsItems from '../components/ListWithTripsItems';


class TripsList extends Component {

    render() {
        return (
            <div>
                <PageHeader header={ 'Trips list' } />
                <ListWithTripsItems />
                <MapModal/>
            </div>
        )
    }
}

export default TripsList;
