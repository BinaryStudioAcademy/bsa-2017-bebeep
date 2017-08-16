import React from 'react';
import EditTripForm from './EditTripForm';
import DirectionsMap from "../../../../app/components/DirectionsMap";
import {geocodeByAddress} from 'react-places-autocomplete';
import Validator from '../../../../app/services/Validator';
import {getCoordinatesFromPlace} from '../../../../app/services/GoogleMapService';
import EditTripService from '../../services/EditTripService';
import moment from 'moment';

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
        const response = {
            price: 111,
            seats: 5,
            start_at: 1502928000,
            from: {
                geometry: {
                    location: {lat: 50.4501, lng: 30.523400000000038}
                },
                formatted_address: "Kyiv City, Kiev, Ukraine, 02000",
            },

            to: {
                geometry: {
                    location: {lat: 49.839683, lng: 24.029717000000005}
                },
                formatted_address: "Kharkiv, Kharkiv Oblast, Ukraine",
            },
        };
        response.start_at = EditTripService.convertTime(response.start_at);
        this.setState({
            trip: response,
        });
        console.log(response);

        /*EditTripService.getTrip(this.props.id)
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
    }

    render() {
        const { trip } = this.state;

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
                        trip={trip}
                        now={moment()}
                    />
                </div>
                <div className="col-sm-6">
                    <DirectionsMap
                        title="Preview Trip"
                        endTime={() => {}}
                        needDirection="1"
                        from={trip.from.geometry.location}
                        to={trip.to.geometry.location}
                    />
                </div>
            </div>
        );
    }
}
export default EditTripContainer;