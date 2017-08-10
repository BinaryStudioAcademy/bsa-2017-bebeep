import { GoogleMap, Marker } from "react-google-maps";
import React, { Component } from 'react';


class GoogleMapEx extends Component {
    render() {
        const  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyAFmHDx19mBe0FC2rsGPIyq6cOUldzOKyk";
        return(
        <GoogleMap
            ref={props.onMapLoad}
            defaultZoom={3}
            defaultCenter={{lat: -25.363882, lng: 131.044922}}
            googleMapURL={googleMapURL}
            onClick={props.onMapClick}
        >
            {props.markers.map((marker, index) => (
                <Marker
                    {...marker}
                    onRightClick={() => props.onMarkerRightClick(index)}
                />
            ))}
        </GoogleMap>
        );
    };
}

export default GoogleMapEx;
