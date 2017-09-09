import React from "react";
import {withGoogleMap, GoogleMap, DirectionsRenderer} from "react-google-maps";
import {getTranslate} from "react-localize-redux";
import {connect} from "react-redux";
import LangeService from '../services/LangService';
import moment from 'moment';
import TripRoute from '../helpers/TripRoute';


const GoogleMapContainer = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={5}
        defaultCenter={{lat: 48.379433, lng: 31.1655799}}>
        {props.directions && <DirectionsRenderer directions={props.directions}/>}
    </GoogleMap>
));

class DirectionsMap extends React.Component {
    state = {
        directions: null,
        distance: null,
        duration: null,
        start_address: null,
        end_address: null,
        start_city: null,
        end_city: null,
        requestId: null,
        directionRenderQueue: [],
        directionRenderQueueIsProcessing: false,
        showTripBlock: !!(this.props.show)
    };

    constructor(props) {
        super(props);

        this.DirectionsService = new google.maps.DirectionsService();
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        if (this.props.needDirection) {
            this.renderDirection(this.props);
        }
        LangeService.addTranslation(require('../lang/directionsmap.locale.json'));
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
        if (this.state.directionRenderQueue.length <= 0 ||
            this.state.directionRenderQueueIsProcessing
        ) {
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
        const { endTime, updateWaypointsDurations } = this.props;

        this.setState({directionRenderQueueIsProcessing: true});

        this.DirectionsService.route({
            origin: props.from,
            destination: props.to,
            waypoints: props.waypoints || [],
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                const route = new TripRoute(result.routes[0]);

                this.setState({
                    directions: result,
                    distance: route.getDistance(),
                    duration: route.getDuration(),
                    start_address: route.getStartPoint().start_address,
                    end_address: route.getEndPoint().end_address,
                    start_city: route.getStartCity(),
                    end_city: route.getEndCity()
                });

                endTime(route.getDurationRaw());
                updateWaypointsDurations(route.getWaypointsDurations());
            }

            this.setState({directionRenderQueueIsProcessing: false});
            this.processDirectionRenderQueue();
        });
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({ showTripBlock: !this.state.showTripBlock });
    }

    render() {
        const {
            start_city,
            end_city,
            directions,
            distance,
            start_address,
            end_address,
            duration,
            showTripBlock
        } = this.state;

        const { translate, title, bookingCount, onClickBooking } = this.props,
            tripDetailsClass = showTripBlock ? 'show-details' : 'hide-details';

        return (
            <div className="card">
                <div className="card-header" onClick={ this.handleClick }>
                    <span>{ title }</span>

                    { bookingCount  ? (
                        <button type="button"
                            className="btn bookings btn-sm btn-primary hover"
                            onClick={ (e) => { e.stopPropagation(); onClickBooking(); } }
                        >
                            { translate('booking.bookings_button') }
                            <span className="badge badge-red">
                                { bookingCount }
                            </span>
                        </button>
                    ) : '' }

                    { start_city ? (
                        <div className="trip-main-points mt-3">
                            <span>{ start_city }</span>
                            <i className="fa fa-long-arrow-right mx-2" aria-hidden="true" />
                            <span>{ end_city }</span>
                            <i className="trip-detail-icon v-align-bottom fa fa-road ml-2"
                                aria-hidden="true" />
                        </div>
                    ) : '' }
                </div>

                <div className={ tripDetailsClass }>
                    <div className="card-block google-map">
                        <GoogleMapContainer
                          containerElement={
                              <div style={{height: `100%`}}/>
                          }
                          mapElement={
                              <div style={{height: `100%`}}/>
                          }
                          center={ this.props.from }
                          directions={ directions }
                        />
                    </div>
                  { distance  ?
                    (
                      <div className="card-footer">
                          <h6>{ translate('directionsmap.trip_info') }</h6>

                          <span className="text-muted">{
                                translate('directionsmap.start_point_address') }: </span>
                            { start_address }<br/>

                          <span className="text-muted">{
                                translate('directionsmap.end_point_address') }: </span>
                            { end_address }<br/>

                          <span className="text-muted">{
                                translate('directionsmap.distance') }: </span>
                            { distance }<br/>

                          <span className="text-muted">{
                                translate('directionsmap.duration') }: </span>
                            { duration }
                      </div>
                    ) : (
                      <div />
                    )
                  }

                  { this.props.children }
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        translate: getTranslate(state.locale)
    })
)(DirectionsMap);
