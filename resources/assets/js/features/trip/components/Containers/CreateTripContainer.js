import React from 'react';
import TripForm from '../Forms/TripForm';
import DirectionsMap from "../../../../app/components/DirectionsMap";
import {geocodeByAddress} from 'react-places-autocomplete';
import Validator from '../../../../app/services/Validator';
import {securedRequest} from '../../../../app/services/RequestService';
import {createTripRules, getStartAndEndTime} from '../../../../app/services/TripService';
import {getCoordinatesFromPlace} from '../../../../app/services/GoogleMapService';
import {tripCreateSuccess} from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import {getTranslate} from 'react-localize-redux';
import '../../styles/create_trip.scss';

class CreateTripContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
            from: this.state.startPoint.place,
            to: this.state.endPoint.place,
        };

        const validated = Validator.validate(createTripRules(), data);

        if (!validated.valid) {
            this.setState({errors: validated.errors});
            return;
        }

        this.setState({errors: {}});

        securedRequest.post('/api/v1/trips', data).then((response) => {
            this.props.tripCreateSuccess(response.data);
            this.setState({errors: {}});

            if (response.status === 200) {
                browserHistory.push('/trips');
            }
        }).catch((error) => {
            this.setState({
                errors: error.response.data
            })
        });

    }

    render() {
        const {translate} = this.props;
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
                    <TripForm
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
                    <DirectionsMap title={translate("preview_trip")}
                                   from={getCoordinatesFromPlace(this.state.startPoint.place)}
                                   to={getCoordinatesFromPlace(this.state.endPoint.place)}
                                   endTime={this.setEndTime.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

const CreateTripContainerConnected = connect(
    state => ({
        translate: getTranslate(state.locale)
    }),
    (dispatch) => bindActionCreators({tripCreateSuccess}, dispatch)
)(CreateTripContainer);

export default CreateTripContainerConnected;
