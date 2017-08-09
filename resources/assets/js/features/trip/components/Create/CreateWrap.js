import React from 'react';
import CreateTrip from './CreateTrip';

class CreateWrap extends React.Component {
    render() {
        return (
            <div>
                <div className="row">
                    <h1>Create new trip</h1><hr/>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <CreateTrip/>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateWrap;
