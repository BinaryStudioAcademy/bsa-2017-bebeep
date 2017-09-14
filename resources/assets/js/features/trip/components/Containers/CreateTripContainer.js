import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { getTranslate } from 'react-localize-redux';
import { geocodeByAddress } from 'react-places-autocomplete';

import TripForm from '../Forms/TripForm';
import { EditableWaypoints } from './EditableWaypoints';
import DirectionsMap from 'app/components/DirectionsMap';

import Validator from 'app/services/Validator';
import CreateTripService from 'features/trip/services/CreateTripService';
import {
    createTripRules,
    getStartAndEndTime,
    getRoutesStartAndEndTime
} from 'app/services/TripService';
import {
    getCoordinatesFromPlace,
    convertWaypointsToGoogleWaypoints
} from 'app/services/GoogleMapService';

import { tripCreateSuccess } from 'features/trip/actions';

import 'features/trip/styles/create_trip.scss';


class CreateTripContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            startPoint: {
                address: '',
                place: null,
            },
            endPoint: {
                address: '',
                place: null,
            },
            tripEndTime: 0,
            waypointsDurations: [],
        };

        this.onChangeStartPoint = this.onChangeStartPoint.bind(this);
        this.onChangeEndPoint = this.onChangeEndPoint.bind(this);
        this.onSelectStartPoint = this.onSelectStartPoint.bind(this);
        this.onSelectEndPoint = this.onSelectEndPoint.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.setTripEndTime = this.setTripEndTime.bind(this);
        this.updateWaypointsDurations = this.updateWaypointsDurations.bind(this);
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
        this.setState({
            tripEndTime: time,
        });
    }

    updateWaypointsDurations(waypointsDurations) {
        this.setState({
            waypointsDurations: waypointsDurations,
        });
    }

    setErrors(errors) {
        errors = errors || {};
        this.setState({ errors: errors });
    }

    onSubmit(e) {
        e.preventDefault();

        const { getPlacesFromWaypoints, tripCreateSuccess } = this.props,
            { startPoint, endPoint, tripEndTime, waypointsDurations } = this.state;

        const form = e.target,
            tripTime = getStartAndEndTime(form.start_at.value, tripEndTime),
            roundTime = form.reverse_start_at
                ? getStartAndEndTime(form.reverse_start_at.value, tripEndTime)
                : false;

        const routesStartAndEndTime = getRoutesStartAndEndTime(
            tripTime.start_at,
            waypointsDurations
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
            routes: routesStartAndEndTime,
            luggage_size: form.luggage_size.value,
            is_animals_allowed: form.is_animals_allowed.checked,
            is_in_both_directions: form.is_in_both_directions.checked,
            reverse_start_at: roundTime ? roundTime.start_at : null
        };

        const validated = Validator.validate(createTripRules(), tripData);

        if (!validated.valid) {
            this.setErrors(validated.errors);
            return;
        }

        this.setErrors();

        CreateTripService.sendCreatedTrip(tripData)
            .then((response) => {
                tripCreateSuccess(response);
                browserHistory.push('/trips');
            })
            .catch(error => {
                this.setErrors(error);
            });
    }

    render() {
        const { translate, waypoints, onWaypointAdd, onWaypointDelete } = this.props,
            { errors, startPoint, endPoint } = this.state;

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

        return (
            <div className="row">
                <div className="col-sm-6">
                    <TripForm
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
                        title={translate("create_trip.preview_trip")}
                        waypoints={convertWaypointsToGoogleWaypoints(waypoints)}
                        from={getCoordinatesFromPlace(startPoint.place)}
                        to={getCoordinatesFromPlace(endPoint.place)}
                        fromData={ startPoint.place || {} }
                        toData={ endPoint.place || {} }
                        endTime={this.setTripEndTime}
                        updateWaypointsDurations={this.updateWaypointsDurations}
                    />
                </div>
            </div>
        );
    }
}

const CreateTripContainerConnected = connect(
    state => ({
        translate: getTranslate(state.locale)
    }),
    (dispatch) => bindActionCreators({tripCreateSuccess}, dispatch)
)(EditableWaypoints(CreateTripContainer));

export default CreateTripContainerConnected;
