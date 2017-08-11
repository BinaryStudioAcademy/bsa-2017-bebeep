import React from 'react';
import Map from '../../features/trip/components/map';

class DirectionsMap extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    {this.props.title}
                </div>
                <div className="card-block">
                    <div className="google-map">
                        <Map from={[41.8507300, -87.6512600]} to={[41.8525800, -87.6514100]} />
                    </div>
                </div>
            </div>
        );
    }
}

export default DirectionsMap;