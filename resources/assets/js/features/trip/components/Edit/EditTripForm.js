import React from 'react';
import moment from 'moment';
import PlacesAutocomplete from 'react-places-autocomplete';

import Input from '../../../../app/components/Input';

class EditTripForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            momentKey: null,
        };
    }

    componentDidMount() {
        this.setState({
            momentKey: moment(),
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.trip.id !== this.props.trip.id ||
            nextProps.startPoint.value !== this.props.startPoint.value ||
            nextProps.endPoint.value !== this.props.endPoint.value;
    }

    render() {
        const { momentKey } = this.state;
        const { trip, errors } = this.props;

        const placesCssClasses = {
            root: 'form-group',
            input: 'form-control',
            autocompleteContainer: 'autocomplete-container'
        };

        return (
            <form role="form" className="card trip-create-from" action="/api/v1/trips" method="POST"
                  onSubmit={ this.props.onSubmit } key={ momentKey }>
                <div className="card-header">
                    Edit Trip #{this.props.id}
                </div>
                <div className="card-block">
                    <div className={"form-group row " + (errors.vehicle_id ? 'has-danger' : '')}>
                        <label className="form-control-label text-muted col-sm-4" htmlFor="vehicle_id">
                            Select car
                        </label>
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
                            <PlacesAutocomplete inputProps={this.props.startPoint}
                                                classNames={placesCssClasses}
                                                onSelect={this.props.onSelectStartPoint}
                                                onEnterKeyDown={this.props.onSelectStartPoint}
                                                key={ momentKey }
                            />
                            <div className="form-control-feedback">{this.props.errors.from}</div>
                        </div>
                    </div>
                    <div className={"form-group row " + (this.props.errors.to ? 'has-danger' : '')}>
                        <label className="form-control-label text-muted col-sm-4">End Point</label>
                        <div className="col-sm-8">
                            <PlacesAutocomplete inputProps={this.props.endPoint}
                                                classNames={placesCssClasses}
                                                onSelect={this.props.onSelectEndPoint}
                                                onEnterKeyDown={this.props.onSelectEndPoint}
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
