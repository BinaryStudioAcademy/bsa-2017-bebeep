import React from 'react';
import EditTripForm from './EditTripForm';
import DirectionsMap from "../../../../app/components/DirectionsMap";
import {geocodeByAddress} from 'react-places-autocomplete';
import { createTripRules, getStartAndEndTime} from '../../../../app/services/TripService';
import Validator from '../../../../app/services/Validator';
import {getCoordinatesFromPlace} from '../../../../app/services/GoogleMapService';
import EditTripService from '../../services/EditTripService';
import { browserHistory } from 'react-router';

class EditTripContainer extends React.Component {
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
            startPlace: null,
            endPlace: null,
        };
    }


    setEndTime(time) {
        this.endTime = time;
    }

    setStartPlaces(startPoint, endPoint) {
        this.setState({
            startPlace: startPoint,
            endPlace: endPoint
        });
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
            from: this.state.startPlace,
            to: this.state.endPlace,
        };
        const validated = Validator.validate(createTripRules, data);

        if (!validated.valid) {
            this.setState({errors: validated.errors});
            return;
        }

        this.setState({errors: {}});

        EditTripService.sendUpdatedTrip(this.props.id, data)
            .then((response) => {
                if (response.status === 200) {
                    browserHistory.push('/trips');
                }
            });

        console.log(data);
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-6">
                    <EditTripForm
                        id={this.props.id}
                        errors={this.state.errors}
                        onSubmit={this.onSubmit.bind(this)}
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
                    ) : (<span>&nbsp;</span>)}
                </div>
            </div>
        );
    }
}
export default EditTripContainer;