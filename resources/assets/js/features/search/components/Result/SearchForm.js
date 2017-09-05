import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import Validator from 'app/services/Validator';
import { getCoordinatesFromPlace } from 'app/services/GoogleMapService';
import { InputPlaces, InputDateTime } from 'app/components/Controls';
import moment from 'moment';

import { searchSuccess } from 'features/search/actions';
import { setUrl, encodeCoord, decodeCoord, getFilter } from 'features/search/services/SearchService';
import { getTranslate } from 'react-localize-redux';

class SearchForm extends React.Component {

    constructor() {
        super();
        this.state = {
            tripData: {},
            errors: {},
            date: null
        };
        this.dateChange = this.dateChange.bind(this);
        this.swapFromTo = this.swapFromTo.bind(this);
        this.onSelectStartPoint = this.onSelectStartPoint.bind(this);
        this.onChangeStartPoint = this.onChangeStartPoint.bind(this);
        this.onChangeEndPoint = this.onChangeEndPoint.bind(this);
        this.onSelectEndPoint = this.onSelectEndPoint.bind(this);
        this.onClickSearch = this.onClickSearch.bind(this);
    }

    dateChange(date) {
        setUrl({start_at: date ? date.unix() : null});
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
        let filter = getFilter();
        if (filter.date) {
            filter.date = moment.unix(filter.date);
        }
        this.setState({
            tripData: newTripData
        });
        this.setState(Object.assign({
            date: props.start_at ? moment.unix(props.start_at) : null
        }, filter));
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
            .catch(error => {});
    }

    setDataAndRedirectSearch() {
        const { tripData } = this.state,
            { searchSuccess } = this.props;

        const searchData = {
            from: {
                name: tripData.from.name,
                coordinate: tripData.from.coordinate,
            },
            to: {
                name: tripData.to.name,
                coordinate: tripData.to.coordinate,
            },
            start_at: tripData.start_at,
        };

        searchSuccess(searchData);
        browserHistory.push('/search');
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
            { onSearch, translate, redirectToSearch } = this.props,
            toBeValidated = {
                from: tripData.from.coordinate,
                to: tripData.to.coordinate,
            },
            resultValidate = {
                from: Validator.coordinate(translate('validate.incorrect_leaving_from_point')),
                to: Validator.coordinate(translate('validate.incorrect_going_to_point'))
            },
            validated = Validator.validate(resultValidate, toBeValidated);

        if (!validated.valid) {
            this.setState({errors: validated.errors});
            return;
        }

        if (redirectToSearch) {
            this.setDataAndRedirectSearch();
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

    isValidDate(current){
        return current.isAfter(moment().subtract( 1, 'day' ));
    };

    render() {
        const {tripData, errors, date} = this.state,
            {translate} = this.props,
            startPlaceCssClasses = {
                root: 'form-group search-block__search-input-start',
                input: 'form-control search-block__search-input',
                autocompleteContainer: 'autocomplete-container'
            },
            endPlaceCssClasses = {
                root: 'form-group search-block__search-input-end',
                input: 'form-control search-block__search-input',
                autocompleteContainer: 'autocomplete-container'
            },
            startPointProps = {
                value: tripData.from.name,
                onChange: this.onChangeStartPoint,
                type: 'search',
                autoFocus: true
            },
            endPointProps = {
                value: tripData.to.name,
                onChange: this.onChangeEndPoint,
                type: 'search',
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
            <div className="search-block">
                <div className="container">
                    <div className="row search-block-centered">
                        <div className="col-sm-3 offset-md-1">
                            <div className={"form-group" + (errors.from ? ' has-danger' : '')}>
                                <label className='form-input search-block__search-label fa-circle-o'>
                                    <PlacesAutocomplete
                                        inputProps={startPointProps}
                                        classNames={startPlaceCssClasses}
                                        onSelect={this.onSelectStartPoint}
                                        onEnterKeyDown={this.onSelectStartPoint}
                                        googleLogo={false}
                                        autocompleteItem={AutocompleteItem}
                                        highlightFirstSuggestion={true}
                                        onError={() => this.setState({errors: {from: 'Invalid address'}})}
                                    />
                                    {errors.from ? (<small className="form-control-feedback text-mutted">{errors.from}</small>) : ''}
                                    <span className="form-input__label search-block__search-label-span">{translate('search_result.from')}</span>
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className={"form-group" + (errors.to ? ' has-danger' : '')}>
                                <label className='form-input search-block__search-label fa-circle'>
                                    <PlacesAutocomplete
                                        inputProps={endPointProps}
                                        classNames={endPlaceCssClasses}
                                        onSelect={this.onSelectEndPoint}
                                        onEnterKeyDown={this.onSelectEndPoint}
                                        googleLogo={false}
                                        autocompleteItem={AutocompleteItem}
                                        highlightFirstSuggestion={true}
                                        onError={() => this.setState({errors: {to: 'Invalid address'}})}
                                    />
                                    {errors.to ? (<small className="form-control-feedback text-mutted">{errors.to}</small>) : ''}
                                    <span className="form-input__label search-block__search-label-span">{translate('search_result.to')}</span>
                                </label>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <InputDateTime
                                id="trip_date"
                                value={date}
                                timeFormat={false}
                                onChange={this.dateChange}
                                isValidDate={this.isValidDate}
                                labelClasses='form-input fa-calendar search-result-datepicker-label'
                                label={translate('search_result.when')}
                                error={errors.start_at}
                                className="search-result-datepicker"
                            />
                        </div>
                        <div className="col-sm-3">
                            <button role="button" className="btn search-block__btn" onClick={this.onClickSearch}>{translate('search_result.search')}</button>
                        </div>
                    </div>
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
        tripData: state.search,
        start_at: state.search.start_at,
        translate: getTranslate(state.locale)
    }),
    dispatch =>
        bindActionCreators({searchSuccess}, dispatch)
)(SearchForm);

export default withRouter(SearchFormConnect);
