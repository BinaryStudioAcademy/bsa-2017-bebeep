import React from 'react';
import CreateTrip from '../components/Create/CreateTrip';
import PageHeader from '../../../app/components/PageHeader';

import '../styles/create_trip.scss';
import DirectionsMap from "../../../app/components/DirectionsMap";

class CreateWrap extends React.Component {
    render() {
        return (
            <div>
                <PageHeader header={ 'Create new trip' } />
                    <div className="row">
                        <div className="col-sm-6">
                            <CreateTrip />
                        </div>
                        <div className="col-sm-6">
                            <DirectionsMap title="Trip Preview" />
                        </div>
                    </div>
            </div>
        );
    }
}

export default CreateWrap;
