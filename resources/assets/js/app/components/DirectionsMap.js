import React from 'react';
import { withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';

import TripRoute from '../helpers/TripRoute';


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
        requestId: null,
        directionRenderQueue: [],
        directionRenderQueueIsProcessing: false
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
            && !this.isWaypointsChanged(nextProps.waypoints)
        ) {
            return;
        }

        this.state.directionRenderQueue.push(nextProps);
        this.processDirectionRenderQueue();
    }

    processDirectionRenderQueue() {
        if (this.state.directionRenderQueue.length <= 0 || this.state.directionRenderQueueIsProcessing) {
            return;
        }

        this.renderDirection(this.state.directionRenderQueue.shift());
    }

    isWaypointsChanged(waypoints) {
        let result = false;

        if (!waypoints) {
            return result;
        }

        if (waypoints.length !== this.props.waypoints.length) {
            return true;
        }

        this.props.waypoints.forEach((waypoint, index) => {
            if (
                waypoint.location.lat !== waypoints[index].location.lat ||
                waypoint.location.lng !== waypoints[index].location.lng
            ) {
                result = true;
            }
        });

        return result;
    }

    renderDirection(props) {
        this.setState({directionRenderQueueIsProcessing: true});

        this.DirectionsService.route({
            origin: props.from,
            destination: props.to,
            waypoints: props.waypoints || [],
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                let route = new TripRoute(result.routes[0]);

                this.setState({
                    directions: result,
                    distance: route.getDistance(),
                    duration: route.getDuration(),
                    start_address: route.getStartPoint().start_address,
                    end_address: route.getEndPoint().end_address
                });

                this.props.endTime(route.getDurationRaw());
            }

            this.setState({directionRenderQueueIsProcessing: false});
            this.processDirectionRenderQueue();
        });
    }

    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <span>{this.props.title}</span>
                    {this.props.bookingCount  ? (
                        <button type="button" className="btn bookings btn-sm btn-primary hover">Bookings <span className="badge badge-red">{this.props.bookingCount}</span></button>
                    ) : ( <span>&nbsp;</span>) }
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
