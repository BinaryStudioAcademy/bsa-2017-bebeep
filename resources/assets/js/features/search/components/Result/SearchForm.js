import React from 'react';
import { connect } from 'react-redux';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import {getCoordinatesFromPlace} from '../../../../app/services/GoogleMapService';
import {bindActionCreators} from 'redux';
import {searchSuccess} from '../../actions';
import Validator from '../../../../app/services/Validator';
import {setUrl, encodeCoord, decodeCoord} from '../../services/SearchService';
import {withRouter} from "react-router";
import PropTypes from "prop-types";

class SearchForm extends React.Component {

    constructor() {
        super();
        this.state = {
            tripData: {},
            errors: {}
        };
        this.swapFromTo = this.swapFromTo.bind(this);
        this.onSelectStartPoint = this.onSelectStartPoint.bind(this);
        this.onChangeStartPoint = this.onChangeStartPoint.bind(this);
        this.onChangeEndPoint = this.onChangeEndPoint.bind(this);
        this.onSelectEndPoint = this.onSelectEndPoint.bind(this);
        this.onClickSearch = this.onClickSearch.bind(this);
    }

    componentWillMount() {
        this.updateState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateState(nextProps);
    }

    updateState(props) {
        const {location, tripData} = props,
            { query } = location,
            newTripData = {
                from: {
                    name: query.fn || tripData.from.name,
                    coordinate: decodeCoord(query.fc) || tripData.from.coordinate
                },
                to: {
                    name: query.tn || tripData.to.name,
                    coordinate: decodeCoord(query.tc) || tripData.to.coordinate
                },
                start_at: +query.start_at || tripData.start_at
            };

        this.setState({
            tripData: newTripData
        });
    }

    swapFromTo() {
        const {tripData} = this.state,
            from = tripData.to,
            to = tripData.from;
        this.setState({tripData: Object.assign(tripData,{from, to})});
    }

    setAddress(type, address) {
        const {tripData} = this.state;
        this.setState({
            tripData: Object.assign(tripData, {
                [type]: {
                    name: address,
                    coordinate: {lat: null, lng: null}
                }
            }),
            errors: {}
        });
    }

    selectGeoPoint(type, address) {
        this.setAddress(type, address);

        geocodeByAddress(address)
            .then(results => {
                this.setState({
                    tripData: Object.assign(this.state.tripData, {
                        [type]: {
                            ...this.state.tripData[type],
                            coordinate: getCoordinatesFromPlace(results[0]),
                        }
                    })
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    onSelectStartPoint(address) {
        this.selectGeoPoint('from', address);
    }

    onSelectEndPoint(address) {
        this.selectGeoPoint('to', address);
    }

    onChangeStartPoint(address) {
        this.setAddress('from', address);
    }

    onChangeEndPoint(address) {
        this.setAddress('to', address);
    }

    onClickSearch(e) {
        e.preventDefault();
        if (Object.keys(this.state.errors).length !== 0) {
            return;
        }
        const { tripData } = this.state,
            { onSearch } = this.props,
            toBeValidated = {
                from: tripData.from.coordinate,
                to: tripData.to.coordinate,
            },
            resultValidate = {
                from: Validator.coordinate('Incorrect leaving from point'),
                to: Validator.coordinate('Incorrect going to point')
            },
            validated = Validator.validate(resultValidate, toBeValidated);
        if (!validated.valid) {
            this.setState({errors: validated.errors});
            return;
        }

        setUrl({
            fn: tripData.from.name,
            fc: encodeCoord(tripData.from.coordinate),
            tn: tripData.to.name,
            tc: encodeCoord(tripData.to.coordinate),
            start_at: tripData.start_at
        });
        onSearch ? onSearch() : null;
    }

    render() {
        const {tripData, errors} = this.state,
            placesCssClasses = {
                root: 'form-group',
                input: 'form-control search-input',
                autocompleteContainer: 'autocomplete-container'
            },
            startPointProps = {
                value: tripData.from.name,
                onChange: this.onChangeStartPoint,
                type: 'search',
                placeholder: 'Leaving from...',
                autoFocus: true
            },
            endPointProps = {
                value: tripData.to.name,
                onChange: this.onChangeEndPoint,
                type: 'search',
                placeholder: 'Going to...',
                autoFocus: false
            },
            AutocompleteItem = ({ formattedSuggestion }) => (
                <div className="suggestion-item">
                    <i className='fa fa-map-marker suggestion-icon' />
                    <strong>{formattedSuggestion.mainText}</strong>{' '}
                    <small className="text-muted">{formattedSuggestion.secondaryText}</small>
                </div>
            );

        return (
            <div className="row">
                <div className="col-sm-4">
                    <div className={"form-group" + (errors.from ? ' has-danger' : '')}>
                        <PlacesAutocomplete
                            inputProps={startPointProps}
                            classNames={placesCssClasses}
                            onSelect={this.onSelectStartPoint}
                            onEnterKeyDown={this.onSelectStartPoint}
                            googleLogo={false}
                            autocompleteItem={AutocompleteItem}
                            highlightFirstSuggestion={true}
                            onError={() => this.setState({errors: {from: 'Invalid address'}})}
                        />
                        {errors.from ? (<small className="form-control-feedback text-mutted">{errors.from}</small>) : ''}
                    </div>

                </div>
                <div className="col-sm-2">
                    <div className="form-group text-center">
                        <button role="button" className="btn btn-success" onClick={this.swapFromTo}><i className="fa fa-exchange"></i></button>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className={"form-group" + (errors.to ? ' has-danger' : '')}>
                        <PlacesAutocomplete
                            inputProps={endPointProps}
                            classNames={placesCssClasses}
                            onSelect={this.onSelectEndPoint}
                            onEnterKeyDown={this.onSelectEndPoint}
                            googleLogo={false}
                            autocompleteItem={AutocompleteItem}
                            highlightFirstSuggestion={true}
                            onError={() => this.setState({errors: {to: 'Invalid address'}})}
                        />
                        {errors.to ? (<small className="form-control-feedback text-mutted">{errors.to}</small>) : ''}
                    </div>
                </div>
                <div className="col-sm-2">
                    <button role="button" className="btn btn-primary" onClick={this.onClickSearch}>Search</button>
                </div>
            </div>
        )
    }
}

SearchForm.PropTypes = {
    onSearch: PropTypes.func
};

const SearchFormConnect = connect(
    state => ({
        tripData: state.search
    }),
    dispatch =>
        bindActionCreators({searchSuccess}, dispatch)
)(SearchForm);

export default withRouter(SearchFormConnect);