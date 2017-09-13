import React from "react";
import {withGoogleMap, GoogleMap, DirectionsRenderer} from "react-google-maps";
import {getTranslate} from "react-localize-redux";
import {connect} from "react-redux";
import LangeService from '../services/LangService';
import moment from 'moment';
import TripRoute from '../helpers/TripRoute';
import {getCityLocation} from '../helpers/TripHelper';

import 'app/styles/directions_map.scss';

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
        showTripBlock: !!(this.props.show),
        hasData: false
    };

    constructor(props) {
        super(props);

        this.DirectionsService = new google.maps.DirectionsService();
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        this.setState({
            start_city: getCityLocation(this.props.fromData),
            end_city: getCityLocation(this.props.toData)
        });

        if (this.state.showTripBlock && this.props.needDirection) {
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
            let newState = {
                directionRenderQueueIsProcessing: false
            };

            if (status === google.maps.DirectionsStatus.OK) {
                const route = new TripRoute(result.routes[0]);

                newState['directions'] = result;
                newState['distance'] = route.getDistance();
                newState['duration'] = route.getDuration();
                newState['start_address'] = route.getStartPoint().start_address;
                newState['end_address'] = route.getEndPoint().end_address;
                newState['hasData'] = true;
                if (!this.state.start_city) {
                    newState['start_city'] = route.getStartCity();
                }
                if (!this.state.end_city) {
                    newState['end_city'] = route.getEndCity();
                }

                endTime(route.getDurationRaw());

                if (typeof updateWaypointsDurations === 'function') {
                    updateWaypointsDurations(route.getWaypointsDurations());
                }
            }
            this.setState(newState);
            this.processDirectionRenderQueue();
        });
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({ showTripBlock: !this.state.showTripBlock });

        if (!this.state.hasData) {
            this.renderDirection(this.props);
        }
    }

    renderBookingButton() {
        const { translate, bookingCount, onClickBooking } = this.props;

        if (!bookingCount) {
            return null;
        }

        return (
            <button type="button"
                className="btn btn-warning show-trip-bookings-btn"
                onClick={(e) => { e.stopPropagation(); onClickBooking(); }}
            >
                {translate('booking.bookings_button')}
                <span className="show-trip-bookings-btn__bookings-count">
                    {bookingCount}
                </span>
            </button>
        );
    }

    renderStartAndEndTripPoints() {
        const { start_city, end_city, directionRenderQueueIsProcessing } = this.state,
            tripIcoClass = 'trip-detail-icon v-align-bottom fa ml-2' +
                (directionRenderQueueIsProcessing
                    ? ' fa-circle-o-notch fa-spin fa-fw'
                    : ' fa-road'
                );

        if (!start_city || !end_city) {
            return null;
        }

        return (
            <div className="trip-main-points mt-3">
                <span>{ start_city }</span>
                <i className="fa fa-long-arrow-right mx-2" aria-hidden="true" />
                <span>{ end_city }</span>
                <i className={tripIcoClass} aria-hidden="true" />
            </div>
        );
    }

    renderTripInfo() {
        const { distance, start_address, end_address, duration } = this.state,
            { translate } = this.props;

        if (!distance) {
            return null;
        }

        return (
            <div className="card-footer trip-card-info trip-card-info--first">
                <h6 className="trip-card-info__header">
                    { translate('directionsmap.trip_info') }
                </h6>

                <dl className="row trip-card-info__list">
                    <dt className="col-sm-4 trip-card-info__list-option">
                        { translate('directionsmap.start_point_address') }</dt>

                    <dd className="col-sm-8 trip-card-info__list-value">
                        { start_address }</dd>

                    <dt className="col-sm-4 trip-card-info__list-option">
                        { translate('directionsmap.end_point_address') }</dt>

                    <dd className="col-sm-8 trip-card-info__list-value">
                        { end_address }</dd>

                    <dt className="col-sm-4 trip-card-info__list-option">
                        { translate('directionsmap.distance') }</dt>

                    <dd className="col-sm-8 trip-card-info__list-value">
                        { distance }</dd>

                    <dt className="col-sm-4 trip-card-info__list-option">
                        { translate('directionsmap.duration') }</dt>

                    <dd className="col-sm-8 trip-card-info__list-value">
                        { duration }</dd>
                </dl>
            </div>
        );
    }

    render() {
        const { directions, showTripBlock } = this.state,
            { translate, title } = this.props,
            tripDetailsClass = showTripBlock ? 'show' : 'hide';

        return (
            <div className="card">
                <div className="card-header" onClick={this.handleClick}>
                    <div className="d-flex justify-content-between align-items-center">
                        <span>{ title }</span>
                        {this.renderBookingButton()}
                    </div>

                    {this.renderStartAndEndTripPoints()}
                </div>

                <div className={"trip-directions-map trip-directions-map--" + tripDetailsClass }>
                    <div className="card-block trip-directions-map__google-map">
                        <GoogleMapContainer
                          containerElement={ <div style={{ height: '100%' }}/> }
                          mapElement={ <div style={{ height: '100%' }}/> }
                          center={this.props.from}
                          directions={directions}
                        />
                    </div>

                    {this.renderTripInfo()}
                    {this.props.children}
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
