import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlacesAutocomplete from 'react-places-autocomplete';
import { localize } from 'react-localize-redux';

import Waypoints from './Waypoints';
import Input from 'app/components/Input';
import { getVehicles } from 'features/car/actions';

import LangService from 'app/services/LangService';
import * as lang from 'features/trip/lang/TripForm.locale.json';

class TripForm extends React.Component {

    componentWillMount() {
        LangService.addTranslation(lang);
        this.props.getVehicles();
    }

    render() {
        const { errors, translate } = this.props;

        return (
            <form role="form" className="card trip-create-from" action="/api/v1/trips" method="POST"
                  onSubmit={ this.props.onSubmit }>
                <div className="card-header">
                    {this.props.trip ? translate('trip_form.edit_trip') : translate('trip_form.create_trip')}
                </div>
                <div className="card-block">
                    <div className={"form-group row " + (errors.vehicle_id ? 'has-danger' : '')}>
                        <label className="form-control-label text-muted col-sm-4" htmlFor="vehicle_id">
                            {translate('trip_form.select_car')}
                        </label>
                        <div className="col-sm-8">
                            {this.props.vehicles.length > 0 &&
                                <select defaultValue={this.props.trip ? this.props.trip.vehicle_id : ''} name="vehicle_id" className="form-control" id="vehicle_id">
                                    {this.props.vehicles.map((vehicle) =>
                                        <option key={vehicle.id} value={vehicle.id}>{vehicle.brand}</option>
                                    )}
                                </select>
                            }
                            <div className="form-control-feedback">{errors.vehicle_id}</div>
                        </div>
                    </div>
                    <Input
                        type="number"
                        name="price"
                        id="price"
                        defaultValue={this.props.trip ? this.props.trip.price : ''}
                        required={false}
                        error={errors.price}>{translate('trip_form.price')}
                    </Input>
                    <Input
                        type="number"
                        name="seats"
                        id="seats"
                        defaultValue={this.props.trip ? this.props.trip.seats : ''}
                        required={false}
                        error={errors.seats}>{translate('trip_form.available_seats')}
                    </Input>
                    <div className={"form-group row " + (this.props.errors.from ? 'has-danger' : '')}>
                        <label className="form-control-label text-muted col-sm-4">{translate('trip_form.start_point')}</label>
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
                        <label className="form-control-label text-muted col-sm-4">{translate('trip_form.end_point')}</label>
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
                        defaultValue={this.props.trip ? this.props.trip.start_at : ''}
                        required={false}
                        error={errors.start_at}>{translate('trip_form.trip_start_time')}
                    </Input>

                    <Waypoints waypoints={this.props.waypoints}
                               placesCssClasses={this.props.placesCssClasses}
                               onWaypointDelete={this.props.onWaypointDelete}
                               onWaypointAdd={this.props.onWaypointAdd}
                    />

                    <div className="form-group">
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">{this.props.trip ? translate('trip_form.edit_trip_btn') : translate('trip_form.create_trip_btn')}</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

const TripFormConnected = connect(
    state => ({
        vehicles: state.vehicle.vehicles,
    }),
    (dispatch) => bindActionCreators({getVehicles}, dispatch)
)(TripForm);

export default localize(TripFormConnected, 'locale');
