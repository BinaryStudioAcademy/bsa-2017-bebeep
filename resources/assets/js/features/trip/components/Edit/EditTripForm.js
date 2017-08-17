import React from 'react';
import Input from '../../../../app/components/Input';
import PlacesAutocomplete from 'react-places-autocomplete';
import EditTripService from '../../services/EditTripService';
import moment from 'moment';

class EditTripForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            trip: {
                price: null,
                seats: null,
                start_at: null,
                routes: {
                    from: {
                        geometry: {
                            location: {lat: 0, lng: 0}
                        },
                        formatted_address: "",
                    },

                    to: {
                        geometry: {
                            location: {lat: 0, lng: 0}
                        },
                        formatted_address: "",
                    },
                }
            },
            notFoundTrip: false,
            errors: {},
            startPoint: {
                address: 'Kyiv City, Kiev, Ukraine, 02000',
                place: null,
            },
            endPoint: {
                address: 'Kharkiv, Kharkiv Oblast, Ukraine',
                place: null,
            }
        };
    }

    componentDidMount() {
        EditTripService.getTrip(this.props.id)
            .then(response => {
                response = EditTripService.transformData(response);
                this.setState({
                    trip: response
                });
            })
            .catch(error => {
                this.setState({
                    notFoundTrip: true,
                });
            });
    }


    render() {
        const { errors } = this.props;
        const { trip, notFoundTrip } = this.state;
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
                                <option value="1">1</option>
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
                            <PlacesAutocomplete inputProps={this.props.startPoint}
                                                classNames={this.props.placesCssClasses}
                                                onSelect={this.props.onSelectStartPoint}
                                                onEnterKeyDown={this.props.onSelectStartPoint}
                            />
                            <div className="form-control-feedback">{this.props.errors.from}</div>
                        </div>
                    </div>
                    <div className={"form-group row " + (this.props.errors.to ? 'has-danger' : '')}>
                        <label className="form-control-label text-muted col-sm-4">End Point</label>
                        <div className="col-sm-8">
                            <PlacesAutocomplete inputProps={this.props.endPoint}
                                                classNames={this.props.placesCssClasses}
                                                onSelect={this.props.onSelectEndPoint}
                                                onEnterKeyDown={this.props.onSelectEndPoint}
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
