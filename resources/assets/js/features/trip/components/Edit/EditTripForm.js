import React from 'react';
import Input from '../../../../app/components/Input';
import PlacesAutocomplete from 'react-places-autocomplete';
import EditTripService from '../../services/EditTripService';
import moment from 'moment';

class EditTripForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            trip: {},
            notFoundTrip: false,
        };
    }

    componentDidMount() {
        const response = {
            price: 111,
            seats: 5,
            start_at: 1502928000,
        };
        response.start_at = EditTripService.convertTime(response.start_at);
        this.setState({
            trip: response,
        });
        /*EditTripService.getTrip()
            .then(response => {
                this.setState({
                    trip: response,
                });
            })
            .catch(error => {
                this.setState({
                    notFoundTrip: true,
                });
            });*/
    }

    render() {
        const { errors } = this.props;
        const { trip } = this.state;
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
                        keys={new Date()}
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
