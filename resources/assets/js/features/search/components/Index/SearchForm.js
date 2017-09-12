import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Button } from 'reactstrap';
import { getTranslate } from 'react-localize-redux';
import moment from 'moment';

import { InputPlaces, InputDateTime } from 'app/components/Controls';

import Validator from 'app/services/Validator';
import { searchIndexRules } from 'app/services/SearchIndex';
import { getCoordinatesFromPlace } from 'app/services/GoogleMapService';

import { searchSuccess } from 'features/search/actions';

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
                coordinate: getCoordinatesFromPlace(this.state.from.place),
                place: this.state.from.place
            },
            to: {
                name: this.state.to.address,
                coordinate: getCoordinatesFromPlace(this.state.to.place),
                place: this.state.to.place
            },
            start_at: this.state.startDate ? this.state.startDate.unix() : null
        };
        this.props.searchSuccess(data);
        browserHistory.push('/search');
    }

    isValidDate(current){
        return current.isAfter(moment().subtract( 1, 'day' ));
    };

    render() {
        const { translate, pageType } = this.props,
            btnType = pageType !== 'index' ? 'info' : 'warning';

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
                        onChange={this.onSelectedTo}
                        error={this.state.errors.to}
                    >{translate('search_index.going_to_label')}</InputPlaces>
                </div>
                <div className="wizard-form__input wizard-form__input_calendar">
                    <InputDateTime
                        id="trip_date"
                        value={this.state.startDate}
                        inputProps={{name: 'trip_date', id: 'trip_date'}}
                        timeFormat={false}
                        isValidDate={this.isValidDate}
                        onChange={this.onChangeDate}
                        labelClasses='form-input fa-calendar'
                        label={translate('search_index.date')}
                        error={this.state.errors.start_at}
                        className="wizard-form__input_calendar-datetimepicker"
                    />
                </div>
                <Button className={"wizard-form__btn btn btn-lg btn-" + btnType}
                    color={btnType}
                    size="lg"
                    role="button"
                    onClick={this.onClick.bind(this)}>
                        { translate('search_index.find_a_ride') }
                </Button>
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

