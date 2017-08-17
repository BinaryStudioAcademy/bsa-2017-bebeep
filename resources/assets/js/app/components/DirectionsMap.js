import React from "react";
import { withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";

const GoogleMapContainer = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={5}
        defaultCenter={{lat: 48.379433, lng: 31.1655799}}>
        {props.directions && <DirectionsRenderer directions={props.directions}/>}
    </GoogleMap>
));

export default class DirectionsMap extends React.Component {
    state = {
        directions: null,
        distance: null,
        duration: null,
        start_address: null,
        end_address: null,
        requestId: null
    };

    constructor() {
        super();

        this.DirectionsService = new google.maps.DirectionsService();
    }

    componentWillMount() {
        if (this.props.needDirection) {
            this.renderDirection(this.props);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (
            this.props.from.lat === nextProps.from.lat &&
            this.props.to.lng === nextProps.to.lng &&
            this.props.from.lat === nextProps.from.lat &&
            this.props.to.lng === nextProps.to.lng
        ) {
            return;
        }

        this.renderDirection(nextProps);
    }

    renderDirection(props) {
        this.DirectionsService.route({
            origin: props.from,
            destination: props.to,
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                let response = result.routes[0].legs[0];

                this.setState({
                    directions: result,
                    distance: response.distance.text,
                    duration: response.duration.text,
                    start_address: response.start_address,
                    end_address: response.end_address
                });

                this.props.endTime(response.duration.value);
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
                            center={this.props.from}
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
                            <div>&nbsp;</div>
                        )
                }
                {this.props.children}
            </div>
        );
    }
}
