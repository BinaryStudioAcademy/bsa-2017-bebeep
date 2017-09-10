import React from 'react';
import { browserHistory } from 'react-router';
import { geocodeByAddress } from 'react-places-autocomplete';

import TripForm from '../Forms/TripForm';
import {localize} from 'react-localize-redux';
import { EditableWaypoints } from './EditableWaypoints';
import DirectionsMap from 'app/components/DirectionsMap';

import Validator from 'app/services/Validator';
import EditTripService from 'features/trip/services/EditTripService';
import {
    createTripRules,
    getStartAndEndTime,
    getRoutesStartAndEndTime
} from 'app/services/TripService';
import {
    convertWaypointsToGoogleWaypoints,
    getCoordinatesFromPlace
} from 'app/services/GoogleMapService';


class EditTripContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            trip: {
                id: null,
                price: null,
                seats: null,
                start_at: null
            },
            notFoundTrip: false,
            errors: {},
            startPoint: {
                address: '',
                place: null,
            },
            endPoint: {
                address: '',
                place: null,
            }
        };

        this.tripEndTime = 0;
        this.waypointsDurations = {};

        this.onChangeStartPoint = this.onChangeStartPoint.bind(this);
        this.onChangeEndPoint = this.onChangeEndPoint.bind(this);
        this.onSelectStartPoint = this.onSelectStartPoint.bind(this);
        this.onSelectEndPoint = this.onSelectEndPoint.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.setTripEndTime = this.setTripEndTime.bind(this);
        this.updateWaypointsDurations = this.updateWaypointsDurations.bind(this);
    }

    componentDidMount() {
        const { id, addWaypointsFromRoutes } = this.props,
            { startPoint, endPoint, trip } = this.state;

        EditTripService.getTrip(id)
            .then(response => {
                response = EditTripService.transformData(response.data);

                const routes = response.routes.data;

                this.setState({
                    trip: response,
                    startPoint: {
                        address: routes[0].from.formatted_address
                    },
                    endPoint: {
                        address: routes[routes.length - 1].to.formatted_address
                    },
                });

                this.onSelectStartPoint(startPoint.address);
                this.onSelectEndPoint(endPoint.address);

                addWaypointsFromRoutes(trip.routes.data);
            })
            .catch(error => {
                this.setState({
                    notFoundTrip: true,
                });
            });
    }

    onChangeStartPoint(address) {
        this.setState({
            startPoint: {address: address}
        });
    }

    onChangeEndPoint(address) {
        this.setState({
            endPoint: {address: address}
        });
    }

    onSelectStartPoint(address) {
        this.selectGeoPoint('start', address);
    }

    onSelectEndPoint(address) {
        this.selectGeoPoint('end', address);
    }

    selectGeoPoint(type, address) {
        this.setState({
            [type + 'Point']: {
                address: address,
                place: null
            }
        });

        geocodeByAddress(address)
            .then(results => {
                this.setState({
                    [type + 'Point']: {
                        place: results[0],
                        address: address,
                    }
                });
            })
            .catch(error => {
                this.setState({
                    [type + 'Point']: {
                        place: null,
                        address: address,
                    }
                })
            });
    }

    setTripEndTime(time) {
        this.tripEndTime = time;
    }

    updateWaypointsDurations(waypointsDurations) {
        this.waypointsDurations = waypointsDurations;
    }

    onSubmit(e) {
        e.preventDefault();

        const { id, getPlacesFromWaypoints } = this.props,
            { startPoint, endPoint } = this.state;

        const form = e.target,
            tripTime = getStartAndEndTime(form.start_at.value, this.tripEndTime),
            routesStartAndEndTime = getRoutesStartAndEndTime(
                tripTime.start_at,
                this.waypointsDurations
            );

        const tripData = {
            vehicle_id: form.vehicle_id.value,
            start_at: tripTime.start_at,
            end_at: tripTime.end_at,
            price: form.price.value,
            seats: form.seats.value,
            from: startPoint.place,
            to: endPoint.place,
            waypoints: getPlacesFromWaypoints(),
            routes_time: routesStartAndEndTime,
            luggage_size: form.luggage_size.value,
            is_animals_allowed: form.is_animals_allowed.checked
        };

        const validated = Validator.validate(createTripRules(), tripData);

        if (! validated.valid) {
            this.setState({errors: validated.errors});
            return;
        }

        this.setState({errors: {}});

        EditTripService.sendUpdatedTrip(id, tripData)
            .then((response) => {
                //browserHistory.push('/trips');
            });
    }

    render() {
        const { translate, id, waypoints, onWaypointAdd, onWaypointDelete } = this.props,
            { trip, errors, startPoint, endPoint, notFoundTrip } = this.state;

        const placesCssClasses = {
            root: 'form-group',
            input: 'form-control',
            autocompleteContainer: 'autocomplete-container text-left'
        };

        const startPointProps = {
            value: startPoint.address,
            onChange: this.onChangeStartPoint,
        };

        const endPointProps = {
            value: endPoint.address,
            onChange: this.onChangeEndPoint,
        };

        if (notFoundTrip) {
            return (
                <div className="alert alert-danger" role="alert">
                    {translate('edit_trip.cant_load_this_trip')}
                </div>
            );
        }

        if (! trip.id) {
            return (
                <div className="alert">
                    {translate('edit_trip.loading')}
                </div>
            );
        }

        return (
            <div className="row">
                <div className="col-sm-6">
                    <TripForm
                        id={id}
                        trip={trip}
                        errors={errors}
                        startPoint={startPointProps}
                        endPoint={endPointProps}
                        onSelectEndPoint={this.onSelectEndPoint}
                        onSelectStartPoint={this.onSelectStartPoint}
                        placesCssClasses={placesCssClasses}
                        onSubmit={this.onSubmit}
                        waypoints={waypoints}
                        onWaypointAdd={onWaypointAdd}
                        onWaypointDelete={onWaypointDelete}
                    />
                </div>
                <div className="col-sm-6">
                    <DirectionsMap
                        show={true}
                        title={translate("edit_trip.preview_trip")}
                        waypoints={convertWaypointsToGoogleWaypoints(waypoints)}
                        from={getCoordinatesFromPlace(startPoint.place)}
                        to={getCoordinatesFromPlace(endPoint.place)}
                        endTime={this.setTripEndTime}
                        updateWaypointsDurations={this.updateWaypointsDurations}
                    />
                </div>
            </div>
        );
    }
}

const EditTripContainerWithWaypoints = EditableWaypoints(EditTripContainer);

export default localize(EditTripContainerWithWaypoints, 'locale');
