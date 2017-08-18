import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DatePicker from 'react-datepicker';
import { browserHistory } from 'react-router';
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress } from 'react-places-autocomplete';

import Validator from 'app/services/Validator';
import { searchIndexRules } from 'app/services/SearchIndex';
import { getCoordinatesFromPlace } from 'app/services/GoogleMapService';

import { searchSuccess } from 'features/search/actions';

import 'features/search/styles/react-datepicker.scss';
import 'features/search/styles/search-index.scss';

class SearchForm extends React.Component {

    constructor() {
        super();
        this.state = {
            errors: {},
            startPoint: {
                address: '',
                place: null,
                coordinate: {lan: null, lng: null}
            },
            endPoint: {
                address: '',
                place: null,
                coordinate: {lan: null, lng: null}
            },
            startDate: null
        };
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    onClick(e) {
        e.preventDefault();
        const toBeValidated = {
            from: this.state.startPoint.place,
            to: this.state.endPoint.place,
            start_at: this.state.startDate,
        };

        const validated = Validator.validate(searchIndexRules, toBeValidated);

        if (!validated.valid) {
            this.setState({errors: validated.errors});
            return;
        }

        this.setState({errors: {}});

        const data = {
            from: {
                name: this.state.startPoint.address,
                coordinate: getCoordinatesFromPlace(this.state.startPoint.place)
            },
            to: {
                name: this.state.endPoint.address,
                coordinate: getCoordinatesFromPlace(this.state.endPoint.place)
            },
            start_at: this.state.startDate ? this.state.startDate.unix() : null
        };
        this.props.searchSuccess(data);
        browserHistory.push('/search');
    }

    onChangeStartPoint(address) {
        this.setState({
            startPoint: {address: address}
        });
    }

    handleDateChange(date) {
        this.setState({
            startDate: date
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

    render() {
        const placesCssClasses = {
            root: 'form-group',
            input: 'form-control search-input',
            autocompleteContainer: 'autocomplete-container'
        };

        const startPointProps = {
            value: this.state.startPoint.address,
            onChange: this.onChangeStartPoint.bind(this),
            type: 'search',
            placeholder: 'Leaving from...',
            autoFocus: true
        };

        const endPointProps = {
            value: this.state.endPoint.address,
            onChange: this.onChangeEndPoint.bind(this),
            type: 'search',
            placeholder: 'Going to...',
            autoFocus: false
        };

        const AutocompleteItem = ({ formattedSuggestion }) => (
            <div className="suggestion-item">
                <i className='fa fa-map-marker suggestion-icon' />
                <strong>{formattedSuggestion.mainText}</strong>{' '}
                <small className="text-muted">{formattedSuggestion.secondaryText}</small>
            </div>);

        return (
            <form role="form" className="search-form" action="" method="POST">
                <div className="row py-4 px-2 px-lg-4">
                    <div className="col-sm-6 col-lg-3">
                        <div className={"form-group " + (this.state.errors.from ? 'has-danger' : '')}>
                            <label htmlFor="startPoint" className="sr-only">Leaving from</label>
                            <PlacesAutocomplete
                                inputProps={startPointProps}
                                classNames={placesCssClasses}
                                onSelect={this.onSelectStartPoint.bind(this)}
                                onEnterKeyDown={this.onSelectStartPoint.bind(this)}
                                googleLogo={false}
                                autocompleteItem={AutocompleteItem}
                                highlightFirstSuggestion={true}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <div className={"form-group " +
                                (this.state.errors.to ? 'has-danger' : '')}>

                            <label htmlFor="endPoint" className="sr-only">Going to</label>
                            <PlacesAutocomplete
                                inputProps={endPointProps}
                                classNames={placesCssClasses}
                                onSelect={this.onSelectEndPoint.bind(this)}
                                onEnterKeyDown={this.onSelectEndPoint.bind(this)}
                                googleLogo={false}
                                autocompleteItem={AutocompleteItem}
                                highlightFirstSuggestion={true}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <DatePicker
                            todayButton={"Today"}
                            selected={this.state.startDate}
                            onChange={this.handleDateChange}
                            placeholderText="Date"
                            minDate={moment()}
                            className={"form-control date-picker " +
                                (this.state.errors.start_at ? 'picker-error' : '')}
                            isClearable={true}
                        />
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <button type="submit"
                            className="btn btn-search btn-primary px-5"
                            onClick={this.onClick.bind(this)}
                        >
                            Find a ride
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default connect(
    null,
    (dispatch) => bindActionCreators({searchSuccess}, dispatch)
)(SearchForm);

