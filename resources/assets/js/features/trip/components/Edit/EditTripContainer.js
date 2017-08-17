import React from 'react';
import EditTripForm from './EditTripForm';
import DirectionsMap from "../../../../app/components/DirectionsMap";
import {geocodeByAddress} from 'react-places-autocomplete';
import { getStartAndEndTime} from '../../../../app/services/TripService';
import Validator from '../../../../app/services/Validator';
import {getCoordinatesFromPlace} from '../../../../app/services/GoogleMapService';
import EditTripService from '../../services/EditTripService';

class EditTripContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            trip: {
                price: null,
                seats: null,
                start_at: null,
                from: {
                    geometry: {
                        location: {lat: 50.449427, lng: 30.484366000000023}
                    },
                    formatted_address: "",
                },

                to: {
                    geometry: {
                        location: {lat: 46.472945, lng: 30.74872879999998}
                    },
                    formatted_address: "",
                },
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
            //from: this.state.startPoint.place,
            //to: this.state.endPoint.place,
        };
        console.log(data);
    }

    render() {
        const placesCssClasses = {
            root: 'form-group',
            input: 'form-control',
            autocompleteContainer: 'autocomplete-container'
        };

        const startPointProps = {
            value: this.state.startPoint.address,
            onChange: this.onChangeStartPoint.bind(this),
        };

        const endPointProps = {
            value: this.state.endPoint.address,
            onChange: this.onChangeEndPoint.bind(this),
        };
        return (
            <div className="row">
                <div className="col-sm-6">
                    <EditTripForm
                        id={this.props.id}
                        errors={this.state.errors}
                        startPoint={startPointProps}
                        endPoint={endPointProps}
                        onSelectEndPoint={this.onSelectEndPoint.bind(this)}
                        onSelectStartPoint={this.onSelectStartPoint.bind(this)}
                        placesCssClasses={placesCssClasses}
                        onSubmit={this.onSubmit.bind(this)}
                    />
                </div>
                <div className="col-sm-6">
                    <DirectionsMap
                        title="Preview Trip"
                        endTime={this.setEndTime.bind(this)}
                        needDirection="1"
                        from={this.state.trip.from.geometry.location}
                        to={this.state.trip.to.geometry.location}
                    />
                </div>
            </div>
        );
    }
}
export default EditTripContainer;