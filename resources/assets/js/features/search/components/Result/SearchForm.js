import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import Validator from 'app/services/Validator';
import { getCoordinatesFromPlace } from 'app/services/GoogleMapService';
import { InputDateTime } from 'app/components/Controls';
import moment from 'moment';

import { searchSuccess, searchParamsUpdate } from 'features/search/actions';
import { setUrl, encodeCoord } from 'features/search/services/SearchService';
import { getTranslate } from 'react-localize-redux';

class SearchForm extends React.Component {

    constructor() {
        super();
        this.state = {
            fromAddress: '',
            toAddresss: '',
            errors: {}
        };
        this.dateChange = this.dateChange.bind(this);
        this.onSelectStartPoint = this.onSelectStartPoint.bind(this);
        this.onChangeStartPoint = this.onChangeStartPoint.bind(this);
        this.onChangeEndPoint = this.onChangeEndPoint.bind(this);
        this.onSelectEndPoint = this.onSelectEndPoint.bind(this);
        this.onClickSearch = this.onClickSearch.bind(this);
    }

    dateChange(date) {
        let start_at = date ? date.unix() : null;
        this.setState({errors: {}});
        setUrl({start_at});
    }

    componentWillMount() {
        this.updateState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        const prevQuery = this.props.location.query,
            nextQuery = nextProps.location.query;

        if (
            nextQuery.fn !== prevQuery.fn
            ||
            nextQuery.tn !== prevQuery.tn
            ||
            nextQuery.start_at !== prevQuery.start_at
        ) {
            this.updateState(nextProps);
        }
    }

    updateState(props) {
        const {location, tripData, searchParamsUpdate} = props,
            { query } = location,
            fromAddress = query.fn || tripData.from.name || '',
            toAddress = query.tn || tripData.to.name || '',
            startAt = +query.start_at || tripData.start_at || null;

        this.setState({ fromAddress, toAddress });

        this.selectGeoPoint('from', fromAddress);
        this.selectGeoPoint('to', toAddress);
        searchParamsUpdate({start_at: startAt});
    }

    selectGeoPoint(type, address) {
        const {searchParamsUpdate} = this.props;

        geocodeByAddress(address)
            .then(results => {
                searchParamsUpdate({
                    [type]: {
                        name: address,
                        coordinate: getCoordinatesFromPlace(results[0]),
                        place: results[0]
                    }
                });
            })
            .catch(error => {});
    }

    setDataAndRedirectSearch() {
        const { searchSuccess, tripData } = this.props;

        browserHistory.push('/search');
    }

    onSelectStartPoint(address) {
        setUrl({ fn: address });
    }

    onSelectEndPoint(address) {
        setUrl({ tn: address });
    }

    onChangeStartPoint(address) {
        this.setState({fromAddress: address, errors: {}});
    }

    onChangeEndPoint(address) {
        this.setState({toAddress: address, errors: {}});
    }

    onClickSearch(e) {
        e.preventDefault();
        if (Object.keys(this.state.errors).length !== 0) {
            return;
        }
        const { tripData } = this.props,
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
        const {fromAddress, toAddress, errors} = this.state,
            {translate, tripData} = this.props,
            date = tripData.start_at && moment(tripData.start_at * 1000),
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
                value: fromAddress,
                onChange: this.onChangeStartPoint,
                type: 'search',
                autoFocus: true
            },
            endPointProps = {
                value: toAddress,
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
                        <div className="col-sm-6 col-lg-3 offset-lg-1">
                            <div className={"form-group" + (errors.from ? ' has-danger' : '')}>
                                <label className='form-input form-input--focus search-block__search-label fa-circle-o'>
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
                        <div className="col-sm-6 col-lg-3">
                            <div className={"form-group" + (errors.to ? ' has-danger' : '')}>
                                <label className='form-input form-input--focus search-block__search-label fa-circle'>
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
                        <div className="col-sm-6 col-lg-2 pb-3">
                            <InputDateTime
                                id="trip_date"
                                value={date}
                                inputProps={{name: 'trip_date', id: 'trip_date'}}
                                timeFormat={false}
                                onChange={this.dateChange}
                                isValidDate={this.isValidDate}
                                labelClasses='form-input form-input--focus fa-calendar search-result-datepicker-label'
                                label={translate('search_result.when')}
                                error={errors.start_at}
                                className="search-result-datepicker"
                            />
                        </div>
                        <div className="col-sm-6 col-lg-3">
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
        bindActionCreators({searchSuccess, searchParamsUpdate}, dispatch)
)(SearchForm);

export default withRouter(SearchFormConnect);
