import React from "react";
import {withGoogleMap, GoogleMap, DirectionsRenderer} from "react-google-maps";

const GoogleMapContainer = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={10}
        defaultCenter={props.center}>
        {props.directions && <DirectionsRenderer directions={props.directions}/>}
    </GoogleMap>
));

export default class DirectionsMap extends React.Component {
    state = {
        origin: this.props.from,
        destination: this.props.to,
        directions: null,
    };

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

                return;
            }

            console.log(`error fetching directions ${result}`, result);
        });
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    {this.props.title}
                </div>
                <div className="card-block google-map">
                    {this.props.from.lat ? (
                        <GoogleMapContainer
                            containerElement={
                                <div style={{height: `100%`}}/>
                            }
                            mapElement={
                                <div style={{height: `100%`}}/>
                            }
                            center={this.state.origin}
                            directions={this.state.directions}
                        />
                    ) : (
                        <p>Enter start point to view map</p>
                    )}
                </div>
            </div>
        );
    }
}