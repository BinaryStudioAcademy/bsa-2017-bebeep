import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import Validator from 'app/services/Validator';
import { searchIndexRules } from 'app/services/SearchIndex';
import { getCoordinatesFromPlace } from 'app/services/GoogleMapService';
import {InputPlaces, InputDate} from 'app/components/Controls/index.js';
import { Button } from 'reactstrap';

import {getTranslate} from 'react-localize-redux';
import { searchSuccess } from 'features/search/actions';

import 'features/search/styles/react-datepicker.scss';
import 'features/search/styles/search-index.scss';

class SearchForm extends React.Component {

    constructor() {
        super();
        this.state = {
            from: {
                place: null,
                address: ''
            },
            to: {
                place: null,
                address: ''
            },
            startDate: null,
            errors: {}
        };

        this.onSelectedFrom = this.onSelectedFrom.bind(this);
        this.onSelectedTo = this.onSelectedTo.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
    }

    onSelectedFrom(from) {
        this.setState({from});
    }

    onSelectedTo(to) {
        this.setState({to});
    }

    onChangeDate(startDate) {
        this.setState({startDate});
    }

    onClick(e) {
        e.preventDefault();
        const toBeValidated = {
            from: this.state.from.place,
            to: this.state.to.place,
            start_at: this.state.startDate,
        };

        const validated = Validator.validate(searchIndexRules(), toBeValidated);

        if (!validated.valid) {
            this.setState({errors: validated.errors});
            return;
        }

        this.setState({errors: {}});

        const data = {
            from: {
                name: this.state.from.address,
                coordinate: getCoordinatesFromPlace(this.state.from.place)
            },
            to: {
                name: this.state.to.address,
                coordinate: getCoordinatesFromPlace(this.state.to.place)
            },
            start_at: this.state.startDate ? this.state.startDate.unix() : null
        };
        this.props.searchSuccess(data);
        browserHistory.push('/search');
    }

    render() {
        const { translate } = this.props;

        return (
            <form role="form" className="search-form" action="" method="POST">
                <div className="wizard-form__input">
                    <InputPlaces
                        id="trip_from"
                        ico="fa-circle-o"
                        onChange={this.onSelectedFrom}
                        error={this.state.errors.from}
                    >{translate('search_index.leaving_from_label')}</InputPlaces>
                </div>
                <div className="wizard-form__input">
                    <InputPlaces
                        id="trip_to"
                        ico="fa-circle-o"
                        onChange={this.onSelectedTo}
                        error={this.state.errors.to}
                    >{translate('search_index.going_to_label')}</InputPlaces>
                </div>
                <div className="wizard-form__input wizard-form__input_calendar">
                    <InputDate
                        id="trip_date"
                        value={this.state.startDate}
                        onChange={this.onChangeDate}
                        label={translate('search_index.date')}
                        error={this.state.errors.start_at}
                    />
                </div>
                <Button className="wizard-form__btn btn btn-warning btn-lg" color="warning" size="lg" role="button" onClick={this.onClick.bind(this)}>{translate('search_index.find_a_ride')}</Button>
            </form>
        );
    }
}

export default connect(
    state => ({
        tripDefaultData: state.search,
        translate: getTranslate(state.locale)
    }),
    (dispatch) => bindActionCreators({searchSuccess}, dispatch)
)(SearchForm);

