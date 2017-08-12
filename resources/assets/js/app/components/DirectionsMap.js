import React from "react";
import {withGoogleMap, GoogleMap, DirectionsRenderer} from "react-google-maps";

const GoogleMapContainer = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={5}
        defaultCenter={{lat: 48.379433, lng: 31.1655799}}>
        {props.directions && <DirectionsRenderer directions={props.directions}/>}
    </GoogleMap>
));

export default class DirectionsMap extends React.Component {
    state = {
        origin: this.props.from,
        destination: this.props.to,
        directions: null,
        distance: null,
        duration: null
    };

    componentDidMount() {
        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
            origin: this.state.origin,
            destination: this.state.destination,
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                let response = result.routes[0].legs[0];
                this.props.endTime(response.duration.value);
                this.setState({
                    directions: result,
                    distance: response.distance.text,
                    duration: response.duration.text,
                    start_address: response.start_address,
                    end_address: response.end_address
                });

                return;
            }
        });
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    {this.props.title}
                </div>
                <div className="card-block google-map">
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
                </div>
                {this.state.distance  ?
                    (
                        <div className="card-footer">
                            <h6>Trip info</h6>
                            <span className="text-muted">Start point address: </span>{this.state.start_address}<br/>
                            <span className="text-muted">End point address: </span>{this.state.end_address}<br/>
                            <span className="text-muted">Distance: </span>{this.state.distance}<br/>
                            <span className="text-muted">Duration: </span>{this.state.duration}
                        </div>
                    ) : (
                            <div></div>
                        )
                }
            </div>
        );
    }
}