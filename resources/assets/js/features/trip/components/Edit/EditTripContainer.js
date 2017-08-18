import React from 'react';
import {geocodeByAddress} from 'react-places-autocomplete';
import EditTripService from '../../services/EditTripService';
import moment from 'moment';
import EditTripForm from './EditTripForm';
import DirectionsMap from "../../../../app/components/DirectionsMap";
import {getCoordinatesFromPlace} from '../../../../app/services/GoogleMapService';


class EditTripContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            momentKey: null,
            trip: {
                price: null,
                seats: null,
                start_at: null
            },
            endTime: null,
            notFoundTrip: false,
            errors: {},
            startPoint: {
                geometry: {
                    location: {
                        lat: 0,
                        lng: 0
                    }
                },
                address: '',
                place: ''
            },
            endPoint: {
                geometry: {
                    location: {
                        lat: 0,
                        lng: 0
                    }
                },
                address: '',
                place: ''
            }
        };
    }

    componentDidMount() {
        EditTripService.getTrip(this.props.id)
            .then(response => {
                console.log(response);
                response = EditTripService.transformData(response);
                const routes = response.routes[0];
                this.setState({
                    momentKey: moment(),
                    trip: response,
                    startPoint: {
                        geometry: {
                            location: routes.from.geometry.location
                        },
                        address: routes.from.formatted_address,
                        place: this.getStartPointPlace(routes.from.formatted_address)
                    },
                    endPoint: {
                        geometry: {
                            location: routes.to.geometry.location
                        },
                        address: routes.to.formatted_address,
                        place: this.getStartPointPlace(routes.to.formatted_address)
                    },
                });
            })
            .catch(error => {
                this.setState({
                    notFoundTrip: true,
                });
            });

    }

    getStartPointPlace(startAddress) {
        let result = geocodeByAddress(startAddress);
        return result[0];
    }

    getStartPointPlace(endAddress) {
        let result = geocodeByAddress(endAddress);
        return result[0];
    }

    onChangeStartPoint(address) {
        this.setState({
            startPoint: {address: address}
        })
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
        this.setState({
            endTime: time
        });
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
        console.log(this.state.startPoint.place);
        return (
            <div className="row">
                <div className="col-sm-6">
                    {this.state.trip ? (
                        <EditTripForm
                            id={this.props.id}
                            errors={this.state.errors}
                            endTime={this.state.endTime}
                            startPoint={startPointProps}
                            endPoint={endPointProps}
                            onSelectEndPoint={this.onSelectEndPoint.bind(this)}
                            onSelectStartPoint={this.onSelectStartPoint.bind(this)}
                            placesCssClasses={placesCssClasses}
                            trip={this.state.trip}
                            momentKey={this.state.momentKey}
                        />
                        ) : (<div className="map-loading"></div>)}
                </div>
                <div className="col-sm-6">
                    {this.state.startPoint ? (
                        <DirectionsMap
                            title="Preview Trip"
                            endTime={this.setEndTime.bind(this)}
                            needDirection="1"
                            from=''/*{getCoordinatesFromPlace(this.state.startPoint)}*/
                            to=''/*{getCoordinatesFromPlace(this.state.endPoint)}*/
                        />
                    ) : (<div className="map-loading"></div>)}
                </div>
            </div>
        );
    }
}
export default EditTripContainer;