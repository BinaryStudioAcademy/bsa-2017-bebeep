import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {geocodeByAddress} from 'react-places-autocomplete';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import '../styles/react-datepicker.scss';
import '../styles/search-index.scss';

class SearchForm extends React.Component {
    constructor() {
        super();

        this.state = {
            startPoint: {
                address: '',
                place: null,
            },
            endPoint: {
                address: '',
                place: null,
            },
            startDate: null
        };

        this.handleDateChange = this.handleDateChange.bind(this);
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
                <div className="row">
                    <form role="form" className="form-inline search-form" action="" method="POST">
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="startPoint" className="sr-only">Leaving from</label>
                                    <div className="col-md-12">
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
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="endPoint" className="sr-only">Going to</label>
                                <div className="col-md-12">
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
                        </div>
                        <DatePicker
                            todayButton={"Today"}
                            selected={this.state.startDate}
                            onChange={this.handleDateChange}
                            placeholderText="Date"
                            minDate={moment()}
                            className="form-control date-picker"
                        />
                        <div className="col-md-3">
                            <button type="submit" className="btn btn-search btn-primary">Find a ride</button>
                        </div>
                    </form>
                </div>
        );
    }
}

export default  SearchForm;

