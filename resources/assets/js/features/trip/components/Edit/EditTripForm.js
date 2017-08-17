import React from 'react';
import Input from '../../../../app/components/Input';
import PlacesAutocomplete from 'react-places-autocomplete';
import EditTripService from '../../services/EditTripService';
import moment from 'moment';
import {geocodeByAddress} from 'react-places-autocomplete';

class EditTripForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
    }

    componentDidMount() {
        EditTripService.getTrip(this.props.id)
            .then(response => {
                response = EditTripService.transformData(response);
                this.setState({
                    trip: response,
                    startPoint: {
                        geometry: {
                            location: response.routes[0].from.geometry.location
                        },
                        address: response.routes[0].from.formatted_address
                    },
                    endPoint: {
                        geometry: {
                            location: response.routes[0].to.geometry.location
                        },
                        address: response.routes[0].to.formatted_address
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

    render() {
        const { errors } = this.props;
        const { trip, notFoundTrip } = this.state;

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
            <div className="alert alert-danger" role="alert">Can`t load this trip. Please try later</div>
        }
        return (
            <form role="form" className="card trip-create-from" action="/api/v1/trips" method=""
                  onSubmit={this.props.onSubmit} key={moment()}>
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
                                                onSelect={this.onSelectStartPoint}
                                                onEnterKeyDown={this.onSelectStartPoint}
                            />
                            <div className="form-control-feedback">{this.props.errors.from}</div>
                        </div>
                    </div>
                    <div className={"form-group row " + (this.props.errors.to ? 'has-danger' : '')}>
                        <label className="form-control-label text-muted col-sm-4">End Point</label>
                        <div className="col-sm-8">
                            <PlacesAutocomplete inputProps={endPointProps}
                                                classNames={placesCssClasses}
                                                onSelect={this.onSelectEndPoint}
                                                onEnterKeyDown={this.onSelectEndPoint}
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
