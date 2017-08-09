import React, { Component } from 'react';

import PageHeader from '../../../app/components/PageHeader';
import ListWithTripsItems from '../components/ListWithTripsItems';


class TripsList extends Component {

    render() {
        return (
            <div>
                <PageHeader header={ 'Trips list' } />
                <ListWithTripsItems />
            </div>
        )
    }
}

export default TripsList;
