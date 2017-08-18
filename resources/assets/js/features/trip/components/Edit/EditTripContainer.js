import React from 'react';
import {geocodeByAddress} from 'react-places-autocomplete';

import EditTripForm from './EditTripForm';
import DirectionsMap from "../../../../app/components/DirectionsMap";
import {getCoordinatesFromPlace} from '../../../../app/services/GoogleMapService';

class EditTripContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            trip: {
                price: null,
                seats: null,
                start_at: null
            },
            endTime: null,
            notFoundTrip: false,
            errors: {},
            startPlace: null,
            endPlace: null,
        };
    }


    setEndTime(time) {
        this.setState({
            endTime: time
        });
    }

    setStartPlaces(startPoint, endPoint) {
        this.setState({
            startPlace: startPoint,
            endPlace: endPoint
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-6">
                    <EditTripForm
                        id={this.props.id}
                        errors={this.state.errors}
                        endTime={this.state.endTime}
                        startPlaces={this.setStartPlaces.bind(this)}
                    />
                </div>
                <div className="col-sm-6">
                    {this.state.startPlace ? (
                        <DirectionsMap
                            title="Preview Trip"
                            endTime={this.setEndTime.bind(this)}
                            needDirection="1"
                            from={this.state.startPlace.geometry.location}
                            to={this.state.endPlace.geometry.location}
                        />
                    ) : (<div className="map-loading"></div>)}
                </div>
            </div>
        );
    }
}
export default EditTripContainer;
