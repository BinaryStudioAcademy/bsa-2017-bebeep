import React from 'react';
import moment from 'moment';
import { browserHistory } from 'react-router';
import PlacesAutocomplete from 'react-places-autocomplete';
import {geocodeByAddress} from 'react-places-autocomplete';

import Input from '../../../../app/components/Input';

import Validator from '../../../../app/services/Validator';
import EditTripService from '../../services/EditTripService';
import { createTripRules, getStartAndEndTime} from '../../../../app/services/TripService';

class EditTripForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            momentKey: null,
            trip: {
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

        //this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        EditTripService.getTrip(this.props.id)
            .then(response => {
                response = EditTripService.transformData(response);
                this.setState({
                    momentKey: moment(),
                    trip: response,
                    startPoint: {
                        geometry: {
                            location: response.routes[0].from.geometry.location
                        },
                        address: response.routes[0].from.formatted_address,
                        place_id: response.routes[0].from.place_id
                    },
                    endPoint: {
                        geometry: {
                            location: response.routes[0].to.geometry.location
                        },
                        address: response.routes[0].to.formatted_address,
                        place_id: response.routes[0].from.place_id
                    },
                });
                this.setStartPlaces();
            })
            .catch(error => {
                this.setState({
                    notFoundTrip: true,
                });
            });
    }

    setStartPlaces() {
        const { startPoint , endPoint } = this.state;
        this.props.startPlaces(startPoint, endPoint);
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

    onSubmit(e) {
        e.preventDefault();

        let time = getStartAndEndTime(e.target['start_at'].value, this.props.endTime);
        let data = {
            vehicle_id: e.target['vehicle_id'].value,
            start_at: time.start_at,
            end_at: time.end_at,
            price: e.target['price'].value,
            seats: e.target['seats'].value,
            from: this.state.startPoint,
            to: this.state.endPoint,
        };

        const validated = Validator.validate(createTripRules, data);

        if (!validated.valid) {
            this.setState({errors: validated.errors});
            return;
        }

        this.setState({errors: {}});

        EditTripService.sendUpdatedTrip(this.props.id, data)
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    //browserHistory.push('/trips');
                }
            });
    }

    render() {
        const { errors } = this.props;
        const { trip, notFoundTrip, momentKey } = this.state;

        const startPointProps = {
            value: this.state.startPoint.address,
            onChange: this.onChangeStartPoint.bind(this),
        };

        const endPointProps = {
            value: this.state.endPoint.address,
            onChange: this.onChangeEndPoint.bind(this),
        };

        const placesCssClasses = {
            root: 'form-group',
            input: 'form-control',
            autocompleteContainer: 'autocomplete-container'
        };

        if (notFoundTrip) {
            return (
                <div className="alert alert-danger" role="alert">Can`t load this trip. Please try later</div>
            );
        }

        return (
            <form role="form" className="card trip-create-from" action="/api/v1/trips" method=""
                  onSubmit={this.onSubmit.bind(this)} key={ momentKey }>
                <div className="card-header">
                    Edit Trip #{this.props.id}
                </div>
                <div className="card-block">
                    <div className={"form-group row " + (errors.vehicle_id ? 'has-danger' : '')}>
                        <label className="form-control-label text-muted col-sm-4" htmlFor="vehicle_id">Select
                            car</label>
                        <div className="col-sm-8">
                            <select name="vehicle_id" className="form-control" id="vehicle_id">
                                <option value="1">BMW X5</option>
                            </select>
                            <div className="form-control-feedback">{errors.vehicle_id}</div>
                        </div>
                    </div>
                    <Input
                        type="number"
                        name="price"
                        id="price"
                        defaultValue={ trip.price }
                        required={false}
                        error={errors.price}>Price
                    </Input>
                    <Input
                        type="number"
                        name="seats"
                        id="seats"
                        defaultValue={ trip.seats }
                        required={false}
                        error={errors.seats}>Available seats
                    </Input>
                    <div className={"form-group row " + (this.props.errors.from ? 'has-danger' : '')}>
                        <label className="form-control-label text-muted col-sm-4">Start Point</label>
                        <div className="col-sm-8">
                            <PlacesAutocomplete inputProps={startPointProps}
                                                classNames={placesCssClasses}
                                                onSelect={this.onSelectStartPoint.bind(this)}
                                                onEnterKeyDown={this.onSelectStartPoint.bind(this)}
                                                key={ momentKey }
                            />
                            <div className="form-control-feedback">{this.props.errors.from}</div>
                        </div>
                    </div>
                    <div className={"form-group row " + (this.props.errors.to ? 'has-danger' : '')}>
                        <label className="form-control-label text-muted col-sm-4">End Point</label>
                        <div className="col-sm-8">
                            <PlacesAutocomplete inputProps={endPointProps}
                                                classNames={placesCssClasses}
                                                onSelect={this.onSelectEndPoint.bind(this)}
                                                onEnterKeyDown={this.onSelectEndPoint.bind(this)}
                                                key={ momentKey }
                            />
                            <div className="form-control-feedback">{this.props.errors.to}</div>
                        </div>
                    </div>
                    <Input
                        type="datetime-local"
                        name="start_at"
                        id="start_at"
                        defaultValue={trip.start_at}
                        required={false}
                        error={errors.start_at}>Trip start time
                    </Input>
                    <div className="form-group">
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">Edit trip</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default EditTripForm;
