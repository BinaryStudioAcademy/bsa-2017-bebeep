import {Map, GoogleApiWrapper} from 'google-maps-react';
import React from 'react';

export class MapContainer extends React.Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={8}
                initialCenter={{
                    lat: 50.4501,
                    lng: 30.523400000000038
                }}
            >
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAXi2uW5u5h-7-2PGD-p06sSFvcS0uc9IA'
})(MapContainer)