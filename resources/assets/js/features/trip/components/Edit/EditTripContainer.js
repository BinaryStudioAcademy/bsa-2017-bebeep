import React from 'react';
import EditTripForm from './EditTripForm';
import DirectionsMap from "../../../../app/components/DirectionsMap";
import {geocodeByAddress} from 'react-places-autocomplete';
import Validator from '../../../../app/services/Validator';
import {getCoordinatesFromPlace} from '../../../../app/services/GoogleMapService';

class EditTripContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            startPoint: {
                address: 'Киев, Kyiv city, Ukraine',
                place: null,
            },
            endPoint: {
                address: 'Одесса, Ukraine',
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
                        from={getCoordinatesFromPlace(this.state.startPoint.place)}
                        to={getCoordinatesFromPlace(this.state.endPoint.place)}
                        endTime={this.setEndTime.bind(this)}
                    />
                </div>
            </div>
        );
    }
}
export default EditTripContainer;