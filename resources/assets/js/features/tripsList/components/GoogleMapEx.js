import {
    default as React,
    Component,
} from "react";

import {
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
} from "react-google-maps";

const  googleMapURL="https://maps.googleapis.com/maps/api/js?sensor=false&libraries=places,geometry&key=AIzaSyAFmHDx19mBe0FC2rsGPIyq6cOUldzOKyk";

const DirectionsExampleGoogleMap = withGoogleMap(props => (
    <GoogleMap
        googleMapURL={googleMapURL}
        defaultZoom={7}
        defaultCenter={props.center}
    >
        {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
));

export default class DirectionsExample extends Component {

    state = {
        origin: new google.maps.LatLng(41.8507300, -87.6512600),
        destination: new google.maps.LatLng(41.8525800, -87.6514100),
        directions: null,
    }

    componentDidMount() {
        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
            origin: this.state.origin,
            destination: this.state.destination,
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result,
                });
            } else {
                console.error(`error fetching directions ${result}`);
            }
        });
    }

    render() {
        return (
            <DirectionsExampleGoogleMap
                containerElement={
                    <div style={{ height: `100%` }} />
                }
                mapElement={
                    <div style={{ height: `100%` }} />
                }
                center={this.state.origin}
                directions={this.state.directions}
            />
        );
    }
}

