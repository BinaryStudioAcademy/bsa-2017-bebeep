import React from 'react';
import CreateTrip from '../components/Create/CreateTrip';
import PageHeader from '../../../app/components/PageHeader';

import '../styles/create_trip.scss';

class CreateWrap extends React.Component {
    render() {
        return (
            <div>
                <PageHeader header={ 'Create new trip' } />
                <div className="row">
                    <div className="col-md-12">
                        <CreateTrip/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="google-map">{/*<GoogleMap />*/}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateWrap;
