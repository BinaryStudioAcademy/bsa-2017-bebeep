import React from 'react';
import { browserHistory } from 'react-router';
import { geocodeByAddress } from 'react-places-autocomplete';

import TripForm from '../Forms/TripForm';
import {localize} from 'react-localize-redux';
import { EditableWaypoints } from './EditableWaypoints';
import DirectionsMap from 'app/components/DirectionsMap';

import Validator from 'app/services/Validator';
import EditTripService from 'features/trip/services/EditTripService';
import { createTripRules, getStartAndEndTime } from 'app/services/TripService';
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
    }

    componentDidMount() {
        EditTripService.getTrip(this.props.id)
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

                this.onSelectStartPoint(this.state.startPoint.address);
                this.onSelectEndPoint(this.state.endPoint.address);

                this.props.addWaypointsFromRoutes(this.state.trip.routes.data);
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

    setEndTime(time) {
        this.endTime = time;
    }

    onSubmit(e) {
        e.preventDefault();

        let time = getStartAndEndTime(e.target['start_at'].value, this.endTime);
        let data = {
            vehicle_id: e.target['vehicle_id'].value,
            start_at: time.start_at,
            end_at: time.end_at,
            price: e.target['price'].value,
            seats: e.target['seats'].value,
            from: this.state.startPoint.place,
            to: this.state.endPoint.place,
            waypoints: this.props.getPlacesFromWaypoints()
        };

        const validated = Validator.validate(createTripRules(), data);

        if (!validated.valid) {
            this.setState({errors: validated.errors});
            return;
        }

        this.setState({errors: {}});

        EditTripService.sendUpdatedTrip(this.props.id, data)
            .then((response) => {
                browserHistory.push('/trips');
            });
    }

    render() {
        const placesCssClasses = {
            root: 'form-group',
            input: 'form-control',
            autocompleteContainer: 'autocomplete-container text-left'
        };

        const { trip,  errors } = this.state;
        const { translate } = this.props;
        const startPointProps = {
            value: this.state.startPoint.address,
            onChange: this.onChangeStartPoint.bind(this),
        };

        const endPointProps = {
            value: this.state.endPoint.address,
            onChange: this.onChangeEndPoint.bind(this),
        };

        if (this.state.notFoundTrip) {
            return (
                <div className="alert alert-danger" role="alert">
                    {translate('edit_trip.cant_load_this_trip')}
                </div>
            );
        }

        if (!this.state.trip.id) {
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
                        id={this.props.id}
                        trip={trip}
                        errors={errors}
                        startPoint={startPointProps}
                        endPoint={endPointProps}
                        onSelectEndPoint={this.onSelectEndPoint.bind(this)}
                        onSelectStartPoint={this.onSelectStartPoint.bind(this)}
                        placesCssClasses={placesCssClasses}
                        onSubmit={this.onSubmit.bind(this)}
                        waypoints={this.props.waypoints}
                        onWaypointAdd={this.props.onWaypointAdd}
                        onWaypointDelete={this.props.onWaypointDelete}
                    />
                </div>
                <div className="col-sm-6">
                    <DirectionsMap
                        title={translate("edit_trip.preview_trip")}
                        waypoints={convertWaypointsToGoogleWaypoints(this.props.waypoints)}
                        from={getCoordinatesFromPlace(this.state.startPoint.place)}
                        to={getCoordinatesFromPlace(this.state.endPoint.place)}
                        endTime={this.setEndTime.bind(this)}
                        show={true}
                    />
                </div>
            </div>
        );
    }
}

const EditTripContainerWithWaypoints = EditableWaypoints(EditTripContainer);

export default localize(EditTripContainerWithWaypoints, 'locale');
