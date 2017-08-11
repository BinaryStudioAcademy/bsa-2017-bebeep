import React from 'react';
import CreateTripForm from '../../layouts/CreateTripForm';
import PageHeader from '../../../../app/components/PageHeader';
import DirectionsMap from "../../../../app/components/DirectionsMap";
import {geocodeByAddress} from 'react-places-autocomplete';
import {connect} from 'react-redux';
import createTripDispatch from '../../actions';
import {bindActionCreators} from 'redux';
import '../../styles/create_trip.scss';


class CreateTrip extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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

    onSubmit(e) {
        e.preventDefault();
        let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QiLCJpYXQiOjE1MDIzODIxMjMsImV4cCI6MTUwMjk4NjkyMywibmJmIjoxNTAyMzgyMTIzLCJqdGkiOiIwbkdsejZzcFQzWjlleVhRIn0.otg9BJNfZa4rytNA5n--cUaOTGYl8-YVSBf0sWO5f7w';
        //let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QiLCJpYXQiOjE1MDI0NDkwMTMsImV4cCI6MTUwMzA1MzgxMywibmJmIjoxNTAyNDQ5MDEzLCJqdGkiOiJCZWR1dE9wOTAxUzhCQjVqIn0.RZC3NxU8Sws2hBEfGMzc-5El1WX_skrYnF36kTmc9I8';
        let date = new Date(e.target['start_at'].value).getTime() / 1000;

        this.props.createTripDispatch({
            vehicle_id: e.target['vehicle_id'].value,
            start_at: Math.round(date),
            end_at: 1513036800,
            price: e.target['price'].value,
            seats: e.target['seats'].value,
            from: this.state.startPoint.place,
            to: this.state.endPoint.place,
        }, token);
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
            <div>
                <PageHeader header={'Create new trip'}/>
                <div className="row">
                    <div className="col-sm-6">
                        <CreateTripForm
                            errors={this.props.errors}
                            startPoint={startPointProps}
                            endPoint={endPointProps}
                            onSelectEndPoint={this.onSelectEndPoint.bind(this)}
                            onSelectStartPoint={this.onSelectStartPoint.bind(this)}
                            placesCssClasses={placesCssClasses}
                            onSubmit={this.onSubmit.bind(this)}
                        />
                    </div>
                    <div className="col-sm-6">
                        <DirectionsMap title="Preview Trip"
                                       key={Date.now()}
                                       from={CreateTrip.getCoordinatesFromPlace(this.state.startPoint.place)}
                                       to={CreateTrip.getCoordinatesFromPlace(this.state.endPoint.place)}
                        />
                    </div>
                </div>
            </div>
        );
    }

    static getCoordinatesFromPlace(place) {
        if (!place) {
            return {lat: 0, lng: 0};
        }

        return {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
        };
    }
}

const CreateTripDispatch = connect(
    (state) => ({
        errors: state.trip.create.errors
    }),
    (dispatch) => bindActionCreators({createTripDispatch}, dispatch)
)(CreateTrip);

export default CreateTripDispatch;
